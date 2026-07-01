export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'novatrix-color-mode',
  },
  googleFonts: {
    display: 'swap',
    subsets: ['latin', 'latin-ext'],
    families: {
      'DM Sans': [400, 500, 600, 700],
      'Space Grotesk': [500, 600, 700],
      'JetBrains Mono': [400, 500, 600],
    },
  },
  image: {
    format: ['webp'],
    quality: 82,
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || (process.env.NODE_ENV === 'production' ? '' : 'mongodb://127.0.0.1:27017/novatrixai'),
    authSessionSecret: process.env.AUTH_SESSION_SECRET || '',
    adminEmail: process.env.ADMIN_EMAIL || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    autopublishApiKey: process.env.AUTOPUBLISH_API_KEY || '',
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || '',
    ghlWebhookUrl: process.env.GHL_WEBHOOK_URL || '',
    mailProviderKey: process.env.MAIL_PROVIDER_KEY || '',
    mailFrom: process.env.MAIL_FROM || 'NovatrixAI <ressources@novatrixai.com>',
    s3Endpoint: process.env.S3_ENDPOINT || '',
    s3Bucket: process.env.S3_BUCKET || '',
    s3Key: process.env.S3_KEY || '',
    s3Secret: process.env.S3_SECRET || '',
    allowDemoDownloads: process.env.ALLOW_DEMO_DOWNLOADS === 'true',
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      calendarUrl: process.env.NUXT_PUBLIC_CALENDAR_URL || 'https://calendly.com/novatrixai',
      whatsappUrl: process.env.NUXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/22900000000',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'fr' },
      titleTemplate: '%s · NovatrixAI',
      meta: [
        { name: 'theme-color', content: '#1C0038' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },
  robots: {
    groups: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/admin'] }],
    sitemap: ['/sitemap.xml'],
  },
  nitro: {
    // Sur Vercel, le preset est auto-détecté (VERCEL=1). Override possible via NITRO_PRESET.
    compressPublicAssets: true,
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
})
