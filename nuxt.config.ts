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
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  i18n: {
    restructureDir: false,
    baseUrl: process.env.SITE_URL || 'http://localhost:3000',
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français' },
      { code: 'en', language: 'en-US', name: 'English' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: false,
  },
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
      // Police variable (axes wght 200..800, opsz 12..96) — un seul fichier
      // par sous-ensemble de caractères au lieu de 3 graisses statiques.
      'Bricolage Grotesque': { wght: '200..800', opsz: '12..96' },
      'JetBrains Mono': [400, 500, 600],
    },
  },
  image: {
    format: ['webp'],
    quality: 82,
  },
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI || process.env.NUXT_MONGO_URL || (process.env.NODE_ENV === 'production' ? '' : 'mongodb://127.0.0.1:27017/novatrixai'),
    authSessionSecret: process.env.AUTH_SESSION_SECRET || '',
    adminEmail: process.env.ADMIN_EMAIL || '',
    adminPassword: process.env.ADMIN_PASSWORD || '',
    autopublishApiKey: process.env.AUTOPUBLISH_API_KEY || '',
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || '',
    ghlWebhookUrl: process.env.GHL_WEBHOOK_URL || '',
    // Envoi d e-mails par SMTP (cf. server/utils/mail.ts).
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: process.env.SMTP_PORT || '587',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    mailFrom: process.env.MAIL_FROM || 'NovatrixAI <contact@novatrixai.com>',
    // Destinataire des alertes 'nouveau lead' si le reglage admin lead_notification_email est vide.
    mailToInternal: process.env.MAIL_TO_INTERNAL || '',
    s3Endpoint: process.env.S3_ENDPOINT || '',
    s3Bucket: process.env.S3_BUCKET || '',
    s3Key: process.env.S3_KEY || '',
    s3Secret: process.env.S3_SECRET || '',
    cloudinaryCloudName: process.env.NUXT_CLOUDINARY_CLOUD_NAME || '',
    cloudinaryApiKey: process.env.NUXT_CLOUDINARY_API_KEY || '',
    cloudinaryApiSecret: process.env.NUXT_CLOUDINARY_API_SECRET || '',
    allowDemoDownloads: process.env.ALLOW_DEMO_DOWNLOADS === 'true',
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      calendarUrl: process.env.NUXT_PUBLIC_CALENDAR_URL || 'https://calendly.com/novatrix217/audit-gratuit',
      // Vide par defaut : les CTA WhatsApp sont masques tant qu un vrai numero n est pas configure.
      whatsappUrl: process.env.NUXT_PUBLIC_WHATSAPP_URL || '',
      cloudinaryCloudName: process.env.NUXT_CLOUDINARY_CLOUD_NAME || '',
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
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
    exclude: ['/merci', '/en/merci'],
  },
  robots: {
    groups: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/admin', '/en/admin'] }],
    sitemap: ['/sitemap_index.xml'],
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
