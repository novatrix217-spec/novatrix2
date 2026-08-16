export default defineEventHandler(async event => {
  await requireAdmin(event)
  const config = useRuntimeConfig()
  const site = String(config.public.siteUrl).replace(/\/$/, '')
  return {
    webhookUrl: `${site}/api/articles`,
    apiKey: config.autopublishApiKey || '',
    configured: Boolean(config.autopublishApiKey),
  }
})
