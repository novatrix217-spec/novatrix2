import { SignJWT,jwtVerify } from 'jose'
const COOKIE='novatrix_session'
function secret(){const value=useRuntimeConfig().authSessionSecret;if(!value||value.length<32)throw createError({statusCode:503,statusMessage:'Secret de session non configuré'});return new TextEncoder().encode(value)}
export async function setAuthSession(event:any,user:{_id:any;email:string;role:string;name:string}){const token=await new SignJWT({email:user.email,role:user.role,name:user.name}).setProtectedHeader({alg:'HS256'}).setSubject(String(user._id)).setIssuedAt().setExpirationTime('12h').sign(secret());const secure=getRequestURL(event).protocol==='https:'||getHeader(event,'x-forwarded-proto')==='https';setCookie(event,COOKIE,token,{httpOnly:true,secure,sameSite:'lax',path:'/',maxAge:43200})}
export function clearAuthSession(event:any){deleteCookie(event,COOKIE,{path:'/'})}
export async function getAuthSession(event:any){const token=getCookie(event,COOKIE);if(!token)return null;try{const {payload}=await jwtVerify(token,secret());return {id:payload.sub!,email:String(payload.email),role:String(payload.role),name:String(payload.name)}}catch{return null}}
export async function requireAdmin(event:any){const session=await getAuthSession(event);if(!session)throw createError({statusCode:401,statusMessage:'Authentification requise'});return session}
