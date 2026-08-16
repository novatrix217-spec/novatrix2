import { v2 as cloudinary } from 'cloudinary'
function config(){return useRuntimeConfig()}
export function cloudinaryConfigured(){const c=config();return Boolean(c.cloudinaryCloudName&&c.cloudinaryApiKey&&c.cloudinaryApiSecret)}
function client(){const c=config();cloudinary.config({cloud_name:c.cloudinaryCloudName,api_key:c.cloudinaryApiKey,api_secret:c.cloudinaryApiSecret,secure:true});return cloudinary}
export async function uploadImage(data:Uint8Array,folder:string){
  if(!cloudinaryConfigured())throw createError({statusCode:503,statusMessage:'Cloudinary non configuré'})
  const base64=`data:image/octet-stream;base64,${Buffer.from(data).toString('base64')}`
  const result=await client().uploader.upload(base64,{folder:`novatrixai/${folder}`,resource_type:'image'})
  return {publicId:result.public_id,url:result.secure_url}
}
export async function uploadRaw(data:Uint8Array,folder:string,filename:string){
  if(!cloudinaryConfigured())throw createError({statusCode:503,statusMessage:'Cloudinary non configuré'})
  const base64=`data:application/octet-stream;base64,${Buffer.from(data).toString('base64')}`
  const publicId=`${filename.replace(/\.[^.]+$/,'').replace(/[^a-z0-9-]/gi,'-')}-${Date.now()}`
  const result=await client().uploader.upload(base64,{folder:`novatrixai/${folder}`,resource_type:'raw',public_id:publicId,use_filename:false})
  return {url:result.secure_url}
}
export function cloudinaryUrl(publicId:string,transform=''){
  const c=config()
  if(!c.cloudinaryCloudName||!publicId)return ''
  const t=transform?`${transform}/`:''
  return `https://res.cloudinary.com/${c.cloudinaryCloudName}/image/upload/${t}${publicId}`
}
