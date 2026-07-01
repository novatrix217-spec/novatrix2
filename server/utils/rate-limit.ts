type Entry={count:number;reset:number}
const buckets=new Map<string,Entry>()
export function assertRateLimit(event:any,key:string,limit:number,windowMs:number){
  const ip=getRequestIP(event,{xForwardedFor:true})||'unknown',now=Date.now(),id=`${key}:${ip}`,entry=buckets.get(id)
  if(!entry||entry.reset<now){buckets.set(id,{count:1,reset:now+windowMs});return}
  entry.count++
  if(entry.count>limit){setResponseHeaders(event,{'Retry-After':String(Math.ceil((entry.reset-now)/1000))});throw createError({statusCode:429,statusMessage:'Trop de tentatives. Réessayez plus tard.'})}
}
