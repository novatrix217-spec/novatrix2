export async function dispatchLeadWebhooks(payload:Record<string,unknown>){
  const config=useRuntimeConfig(),urls=[config.n8nWebhookUrl,config.ghlWebhookUrl].filter(Boolean)
  await Promise.allSettled(urls.map(async url=>{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),5000);try{await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),signal:controller.signal})}finally{clearTimeout(timer)}}))
}
