export default defineEventHandler(async event => {
  setResponseHeaders(event, { 'content-type': 'text/plain; charset=utf-8' })
  return buildLlmsTxt('en')
})
