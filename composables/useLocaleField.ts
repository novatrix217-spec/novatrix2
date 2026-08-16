// Pioche la version anglaise d'un champ si elle existe et qu'on est en `en`, sinon garde le français.
// Usage : const lf = useLocaleField(); lf(project.title, project.titleEn)
export function useLocaleField() {
  const { locale } = useI18n()
  return <T,>(fr: T, en?: T | null): T => (locale.value === 'en' && en) ? en : fr
}
