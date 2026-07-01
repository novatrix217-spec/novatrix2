export default defineEventHandler(event=>{
  const headers:Record<string,string>={'X-Content-Type-Options':'nosniff','X-Frame-Options':'SAMEORIGIN','Referrer-Policy':'strict-origin-when-cross-origin','Permissions-Policy':'camera=(), microphone=(), geolocation=()','Content-Security-Policy':"default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; frame-src https://calendly.com https://*.gohighlevel.com; object-src 'none'; base-uri 'self'; form-action 'self'"}
  if(process.env.NODE_ENV==='production')headers['Strict-Transport-Security']='max-age=31536000; includeSubDomains'
  setResponseHeaders(event,headers)
})
