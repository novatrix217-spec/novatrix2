export function useEnglishAlternateAvailability() {
  const englishAlternateAvailable = useState('english-alternate-available', () => true)
  const setEnglishAlternateAvailable = (available: boolean) => {
    englishAlternateAvailable.value = available
  }
  return { englishAlternateAvailable, setEnglishAlternateAvailable }
}
