import { randomUUID } from 'node:crypto'
import { storageConfigured,uploadObject } from '../../utils/storage'
import { cloudinaryConfigured,uploadImage,uploadRaw } from '../../utils/cloudinary'
const allowed=new Set(['application/pdf','image/png','image/jpeg','image/webp','video/mp4','application/zip'])
export default defineEventHandler(async event=>{
  await requireAdmin(event)
  const parts=await readMultipartFormData(event),file=parts?.find(p=>p.name==='file')
  if(!file?.data||!file.filename||!file.type)throw createError({statusCode:400,statusMessage:'Fichier manquant'})
  if(!allowed.has(file.type))throw createError({statusCode:415,statusMessage:'Type de fichier refusé'})
  if(file.data.byteLength>25*1024*1024)throw createError({statusCode:413,statusMessage:'Fichier trop volumineux'})
  const folder=String(getQuery(event).folder||'misc').replace(/[^a-z0-9-]/gi,'')||'misc'
  if(file.type.startsWith('image/')){const {publicId,url}=await uploadImage(file.data,folder);return {key:publicId,url}}
  if(cloudinaryConfigured()){const {url}=await uploadRaw(file.data,folder,file.filename);return {key:url}}
  if(storageConfigured()){const ext=file.filename.split('.').pop()?.replace(/[^a-z0-9]/gi,'')||'bin',key=`resources/${new Date().getFullYear()}/${randomUUID()}.${ext}`;await uploadObject(key,file.data,file.type);return {key}}
  throw createError({statusCode:503,statusMessage:'Aucun stockage configuré (Cloudinary ou S3)'})
})
