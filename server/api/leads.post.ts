import { z } from 'zod'
import { LeadModel } from '../models/Lead'
import { ResourceModel } from '../models/Resource'
import { demoResources } from '../../shared/demo'
import { dispatchLeadWebhooks } from '../utils/webhooks'
import { createDownloadToken } from '../utils/storage'
import { sendResourceMail } from '../utils/mail'
const schema=z.object({firstName:z.string().trim().min(2).max(80),email:z.string().trim().email().max(320).transform(v=>v.toLowerCase()),phone:z.string().trim().min(6).max(30),domain:z.string().trim().min(2).max(120),message:z.string().trim().max(3000).optional(),consent:z.literal(true),website:z.string().max(0).optional().default(''),resourceSlug:z.string().trim().max(120).optional(),source:z.enum(['resource','contact','newsletter']).default('contact'),utm:z.object({source:z.any().optional(),medium:z.any().optional(),campaign:z.any().optional()}).optional()})
export default defineEventHandler(async event=>{
  assertRateLimit(event,'lead',5,15*60*1000);const parsed=schema.safeParse(await readBody(event));if(!parsed.success)throw createError({statusCode:400,statusMessage:'Vérifiez les champs et le consentement.'});const input=parsed.data
  await connectDb();let resource:any=null
  if(input.source==='resource'){if(!input.resourceSlug)throw createError({statusCode:400,statusMessage:'Ressource manquante'});resource=await ResourceModel.findOne({slug:input.resourceSlug,published:true});if(!resource){const demo=demoResources.find(r=>r.slug===input.resourceSlug);if(demo)resource=await ResourceModel.findOneAndUpdate({slug:demo.slug},{$setOnInsert:demo},{new:true,upsert:true});}if(!resource)throw createError({statusCode:404,statusMessage:'Ressource introuvable'})}
  let lead=await LeadModel.findOne({email:input.email,...(resource?{resourceId:resource._id}:{source:input.source})});let created=false
  if(!lead){lead=await LeadModel.create({...input,resourceId:resource?._id,resourceSlug:resource?.slug,utm:{source:String(input.utm?.source||''),medium:String(input.utm?.medium||''),campaign:String(input.utm?.campaign||'')},ip:getRequestIP(event,{xForwardedFor:true}),userAgent:getHeader(event,'user-agent')||''});created=true;if(resource)await ResourceModel.updateOne({_id:resource._id},{$inc:{leadCount:1}})}
  let downloadUrl=''
  if(resource){const token=await createDownloadToken(String(resource._id),resource.slug);downloadUrl=`/api/resources/${resource._id}/download?token=${encodeURIComponent(token)}`}
  const site=String(useRuntimeConfig().public.siteUrl).replace(/\/$/,'')
  if(created){const payload={leadId:String(lead._id),firstName:lead.firstName,email:lead.email,phone:lead.phone,domain:lead.domain,source:lead.source,resourceSlug:resource?.slug||null,timestamp:new Date().toISOString()};await dispatchLeadWebhooks(payload);if(resource&&downloadUrl)sendResourceMail(lead.email,lead.firstName,resource.title,`${site}${downloadUrl}`).catch(console.error)}
  return {success:true,downloadUrl}
})
