import { GetObjectCommand,PutObjectCommand,S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { SignJWT,jwtVerify } from 'jose'
function config(){return useRuntimeConfig()}
export function storageConfigured(){const c=config();return Boolean(c.s3Endpoint&&c.s3Bucket&&c.s3Key&&c.s3Secret)}
function client(){const c=config();return new S3Client({region:'auto',endpoint:c.s3Endpoint,forcePathStyle:true,credentials:{accessKeyId:c.s3Key,secretAccessKey:c.s3Secret}})}
export async function signedObjectUrl(key:string,fileName:string){const c=config();if(!storageConfigured())throw createError({statusCode:503,statusMessage:'Stockage non configuré'});return getSignedUrl(client(),new GetObjectCommand({Bucket:c.s3Bucket,Key:key,ResponseContentDisposition:`attachment; filename="${fileName.replace(/[^a-z0-9._-]/gi,'-')}"`}),{expiresIn:300})}
export async function uploadObject(key:string,body:Uint8Array,contentType:string){const c=config();if(!storageConfigured())throw createError({statusCode:503,statusMessage:'Stockage non configuré'});await client().send(new PutObjectCommand({Bucket:c.s3Bucket,Key:key,Body:body,ContentType:contentType}))}
function tokenSecret(){const value=config().authSessionSecret;if(!value||value.length<32)throw createError({statusCode:503,statusMessage:'Secret de signature non configuré'});return new TextEncoder().encode(value)}
export async function createDownloadToken(resourceId:string,slug:string){return new SignJWT({resourceId,slug,purpose:'resource-download'}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('15m').sign(tokenSecret())}
export async function verifyDownloadToken(token:string){const {payload}=await jwtVerify(token,tokenSecret());if(payload.purpose!=='resource-download')throw new Error('invalid purpose');return {resourceId:String(payload.resourceId),slug:String(payload.slug)}}
