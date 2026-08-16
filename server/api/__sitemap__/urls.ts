import { ArticleModel } from '../../models/Article'
import { ProjectModel } from '../../models/Project'
import { ResourceModel } from '../../models/Resource'

const fixed = ['/', '/offres', '/offres/acquisition', '/offres/pilotage-ia', '/offres/creation-web-apps', '/solutions/agent-whatsapp-ia', '/solutions/automatisation-n8n', '/solutions/relance-panier-abandonne', '/agence-ia-cotonou', '/realisations', '/avis', '/ressources', '/blog', '/a-propos', '/contact', '/confidentialite']

// Émet chaque route en français (racine) et en anglais (préfixe /en), avec les alternates
// hreflang qui pointent l'une vers l'autre — évite le piège du faux bilingue (même contenu
// servi sous deux URLs sans que les moteurs sachent qu'elles sont liées).
function withLocales(path: string, lastmod?: Date) {
  const fr = path
  const en = path === '/' ? '/en' : `/en${path}`
  return [
    { loc: fr, lastmod, alternatives: [{ hreflang: 'fr', href: fr }, { hreflang: 'en', href: en }, { hreflang: 'x-default', href: fr }] },
    { loc: en, lastmod, alternatives: [{ hreflang: 'fr', href: fr }, { hreflang: 'en', href: en }, { hreflang: 'x-default', href: fr }] },
  ]
}

export default defineSitemapEventHandler(async () => {
  try {
    await connectDb()
    const [articles, resources, projects] = await Promise.all([
      ArticleModel.find({ status: 'published' }).select('slug updatedAt').lean(),
      ResourceModel.find({ published: true }).select('slug updatedAt').lean(),
      ProjectModel.find({ status: 'published' }).select('slug updatedAt').lean(),
    ])
    return [
      ...fixed.flatMap(loc => withLocales(loc)),
      ...articles.flatMap(a => withLocales(`/blog/${a.slug}`, a.updatedAt)),
      ...resources.flatMap(r => withLocales(`/ressources/${r.slug}`, r.updatedAt)),
      ...projects.flatMap(p => withLocales(`/realisations/${p.slug}`, p.updatedAt)),
    ]
  } catch {
    return fixed.flatMap(loc => withLocales(loc))
  }
})
