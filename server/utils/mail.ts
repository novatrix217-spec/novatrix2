export async function sendResourceMail(to:string,firstName:string,title:string,downloadUrl:string){
  const c=useRuntimeConfig();if(!c.mailProviderKey)return
  await fetch('https://api.resend.com/emails',{method:'POST',headers:{authorization:`Bearer ${c.mailProviderKey}`,'content-type':'application/json'},body:JSON.stringify({from:c.mailFrom,to:[to],subject:`Votre ressource NovatrixAI : ${title}`,html:`<p>Bonjour ${firstName},</p><p>Votre ressource est prête.</p><p><a href="${downloadUrl}">Télécharger ${title}</a></p><p>Ce lien expire rapidement.</p>`})})
}
