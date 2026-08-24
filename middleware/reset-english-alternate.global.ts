export default defineNuxtRouteMiddleware(() => {
  const { setEnglishAlternateAvailable } = useEnglishAlternateAvailability()
  setEnglishAlternateAvailable(true)
})
