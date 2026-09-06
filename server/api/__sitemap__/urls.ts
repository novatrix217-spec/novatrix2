import { ArticleModel } from '../../models/Article'
import { ProjectModel } from '../../models/Project'
import { ResourceModel } from '../../models/Resource'
import { hasCompleteArticleEnglish, hasCompleteProjectEnglish, hasCompleteResourceEnglish } from '../../../shared/english-content'

const fixed = ['/', '/offres', '/offres/acquisition', '/offres/pilotage-ia', '/offres/novatrix-launch', '/offres/retention-ecommerce', '/offres/creation-web-apps', '/solutions', '/solutions/agent-whatsapp-ia', '/solutions/automatisation-n8n', '/solutions/relance-panier-abandonne', '/agence-ia-cotonou', '/realisations', '/video-lab', '/avis', '/ressources', '/blog', '/formation', '/a-propos', '/contact', '/confidentialite', '/mentions-legales']

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

function withOptionalEnglish(path: string, lastmod: Date | undefined, englishComplete: boolean) {
  if (englishComplete) return withLocales(path, lastmod)
  return [{ loc: path, lastmod, alternatives: [{ hreflang: 'fr', href: path }, { hreflang: 'x-default', href: path }] }]
}

export default defineSitemapEventHandler(async () => {
  try {
    await connectDb()
    const [articles, resources, projects] = await Promise.all([
      ArticleModel.find({ status: 'published' }).select('slug updatedAt titleEn excerptEn bodyEn categoryEn tags tagsEn readingTimeEn').lean(),
      ResourceModel.find({ published: true }).select('slug updatedAt titleEn descriptionEn sectorEn').lean(),
      ProjectModel.find({ status: 'published' }).select('slug updatedAt titleEn categoryEn summaryEn challenge challengeEn solution solutionEn features featuresEn results resultsEn quoteBefore quoteBeforeEn quoteAfter quoteAfterEn').lean(),
    ])
    return [
      ...fixed.flatMap(loc => withLocales(loc)),
      ...articles.flatMap(a => withOptionalEnglish(`/blog/${a.slug}`, a.updatedAt, hasCompleteArticleEnglish(a))),
      ...resources.flatMap(r => withOptionalEnglish(`/ressources/${r.slug}`, r.updatedAt, hasCompleteResourceEnglish(r))),
      ...projects.flatMap(p => withOptionalEnglish(`/realisations/${p.slug}`, p.updatedAt, hasCompleteProjectEnglish(p))),
    ]
  } catch {
    return fixed.flatMap(loc => withLocales(loc))
  }
})
