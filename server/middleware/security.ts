export default defineEventHandler(event=>{
  const headers:Record<string,string>={'X-Content-Type-Options':'nosniff','X-Frame-Options':'SAMEORIGIN','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()','Content-Security-Policy':"default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com; font-src 'self' https://fonts.gstatic.com https://assets.calendly.com; script-src 'self' 'unsafe-inline' https://assets.calendly.com; connect-src 'self' https:; frame-src https://calendly.com https://*.calendly.com https://*.gohighlevel.com; object-src 'none'; base-uri 'self'; form-action 'self'"}
  if(process.env.NODE_ENV==='production')headers['Strict-Transport-Security']='max-age=31536000; includeSubDomains'
  setResponseHeaders(event,headers)
})
