export default defineEventHandler(async event=>{const user=await getAuthSession(event);if(!user)throw createError({statusCode:401,statusMessage:'Non authentifié'});return {user}})
