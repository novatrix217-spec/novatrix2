import { ResourceModel } from '../../../models/Resource'
import { signedObjectUrl, storageConfigured, verifyDownloadToken } from '../../../utils/storage'

interface DownloadableResource { published: boolean; fileKey: string; slug: string; type: string; title: string }

/**
 * Sert le fichier d'une ressource contre un token signé (15 min, lié à l'id de la ressource).
 *
 * Les fichiers sont hébergés sur Cloudinary : l'upload admin y écrit et stocke l'URL
 * complète dans `fileKey`, servie ici par redirection. Le chemin S3 signé n'est conservé
 * que pour les ressources historiques dont la `fileKey` est une clé d'objet, pas une URL.
 */
export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')!
  const token = String(getQuery(event).token || '')
  if (!token) throw createError({ statusCode: 401, statusMessage: 'Lien invalide' })

  let payload
  try { payload = await verifyDownloadToken(token) }
  catch { throw createError({ statusCode: 401, statusMessage: 'Lien expiré ou invalide' }) }
  if (payload.resourceId !== id) throw createError({ statusCode: 403, statusMessage: 'Lien invalide' })

  await connectDb()
  const resource = await ResourceModel.findById(id).lean() as DownloadableResource | null
  if (!resource || !resource.published) throw createError({ statusCode: 404, statusMessage: 'Ressource introuvable' })

  // Cas courant : Cloudinary (ou tout hébergeur) a renvoyé une URL absolue.
  if (resource.fileKey?.startsWith('http')) return sendRedirect(event, resource.fileKey, 302)

  // Ressources historiques stockées comme clés d'objet S3.
  if (storageConfigured()) return sendRedirect(event, await signedObjectUrl(resource.fileKey, `${resource.slug}.${resource.type === 'template' ? 'pdf' : resource.type}`), 302)

  if (useRuntimeConfig().allowDemoDownloads) {
    setResponseHeaders(event, { 'content-type': 'text/plain; charset=utf-8', 'content-disposition': `attachment; filename="${resource.slug}.txt"` })
    return `Ressource de démonstration : ${resource.title}\n\nLe fichier réel n'a pas encore été téléversé depuis /admin/ressources.\n`
  }

  throw createError({ statusCode: 503, statusMessage: 'Fichier indisponible' })
})
