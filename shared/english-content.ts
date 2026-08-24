import type { PublicArticle, PublicProject, PublicResource } from './types'

const hasText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0
const translatedListIsComplete = (source: unknown, translated: unknown) => {
  if (!Array.isArray(source) || source.length === 0) return true
  return Array.isArray(translated) && translated.length >= source.length && translated.every(hasText)
}

export function hasCompleteArticleEnglish(input: unknown) {
  const article = input as Partial<Pick<PublicArticle, 'titleEn' | 'excerptEn' | 'bodyEn' | 'categoryEn' | 'tags' | 'tagsEn' | 'readingTimeEn'>>
  return hasText(article.titleEn)
    && hasText(article.excerptEn)
    && hasText(article.bodyEn)
    && hasText(article.categoryEn)
    && translatedListIsComplete(article.tags, article.tagsEn)
    && typeof article.readingTimeEn === 'number'
    && article.readingTimeEn > 0
}

export function hasCompleteResourceEnglish(input: unknown) {
  const resource = input as Partial<Pick<PublicResource, 'titleEn' | 'descriptionEn' | 'sectorEn'>>
  return hasText(resource.titleEn) && hasText(resource.descriptionEn) && hasText(resource.sectorEn)
}

export function hasCompleteProjectEnglish(input: unknown) {
  const project = input as Partial<Pick<PublicProject, 'titleEn' | 'categoryEn' | 'summaryEn' | 'challenge' | 'challengeEn' | 'solution' | 'solutionEn' | 'features' | 'featuresEn' | 'quoteBefore' | 'quoteBeforeEn' | 'quoteAfter' | 'quoteAfterEn'>>
  return hasText(project.titleEn)
    && hasText(project.categoryEn)
    && hasText(project.summaryEn)
    && (!hasText(project.challenge) || hasText(project.challengeEn))
    && (!hasText(project.solution) || hasText(project.solutionEn))
    && translatedListIsComplete(project.features, project.featuresEn)
    && (!hasText(project.quoteBefore?.text) || hasText(project.quoteBeforeEn?.text))
    && (!hasText(project.quoteAfter?.text) || hasText(project.quoteAfterEn?.text))
}
