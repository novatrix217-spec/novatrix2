const DEFAULT_CALENDLY_URL = 'https://calendly.com/novatrix217/audit-gratuit'
const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'
const CALENDLY_STYLES = 'https://assets.calendly.com/assets/external/widget.css'

let loaderPromise: Promise<void> | null = null

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement; resize?: boolean }) => void
    }
  }
}

export function loadCalendlyAssets(): Promise<void> {
  if (!import.meta.client) return Promise.resolve()
  if (!navigator.onLine) return Promise.reject(new Error('offline'))
  if (window.Calendly) return Promise.resolve()
  if (loaderPromise) return loaderPromise

  loaderPromise = new Promise<void>((resolve, reject) => {
    if (!document.querySelector('link[data-calendly]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = CALENDLY_STYLES
      link.dataset.calendly = 'true'
      document.head.appendChild(link)
    }

    const timeout = window.setTimeout(() => reject(new Error('timeout')), 12000)
    const finish = () => {
      window.clearTimeout(timeout)
      window.Calendly ? resolve() : reject(new Error('unavailable'))
    }
    const fail = () => {
      window.clearTimeout(timeout)
      reject(new Error('load'))
    }
    const existing = document.querySelector<HTMLScriptElement>('script[data-calendly]')
    if (existing) {
      existing.addEventListener('load', finish, { once: true })
      existing.addEventListener('error', fail, { once: true })
      return
    }
    const script = document.createElement('script')
    script.src = CALENDLY_SCRIPT
    script.async = true
    script.dataset.calendly = 'true'
    script.addEventListener('load', finish, { once: true })
    script.addEventListener('error', fail, { once: true })
    document.body.appendChild(script)
  }).catch((error) => {
    document.querySelector('script[data-calendly]')?.remove()
    loaderPromise = null
    throw error
  })

  return loaderPromise
}

export function useCalendly() {
  const configuredUrl = useRuntimeConfig().public.calendarUrl
  const bookingOpen = useState('booking-open', () => false)
  const calendarUrl = (() => {
    if (typeof configuredUrl !== 'string' || !configuredUrl.trim()) return DEFAULT_CALENDLY_URL
    try {
      const parsed = new URL(configuredUrl.trim())
      const isCalendlyHost = parsed.hostname === 'calendly.com' || parsed.hostname.endsWith('.calendly.com')
      return parsed.protocol === 'https:' && isCalendlyHost ? parsed.toString() : DEFAULT_CALENDLY_URL
    } catch {
      return DEFAULT_CALENDLY_URL
    }
  })()
  const openCalendly = (event?: Event) => {
    event?.preventDefault()
    bookingOpen.value = true
  }
  const closeCalendly = () => { bookingOpen.value = false }
  const initInlineWidget = async (element: HTMLElement) => {
    await loadCalendlyAssets()
    element.replaceChildren()
    window.Calendly?.initInlineWidget({ url: calendarUrl, parentElement: element, resize: true })
  }

  return { bookingOpen, calendarUrl, openCalendly, closeCalendly, initInlineWidget }
}
