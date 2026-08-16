import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { UserModel } from '../../models/User'
const schema=z.object({currentPassword:z.string().min(1),newPassword:z.string().min(8).max(200)})
export default defineEventHandler(async event=>{
  const session=await requireAdmin(event)
  const parsed=schema.safeParse(await readBody(event))
  if(!parsed.success)throw createError({statusCode:400,statusMessage:'Mot de passe invalide (8 caractères minimum)'})
  await connectDb()
  const user=await UserModel.findById(session.id)
  if(!user)throw createError({statusCode:404,statusMessage:'Utilisateur introuvable'})
  if(!await bcrypt.compare(parsed.data.currentPassword,user.passwordHash))throw createError({statusCode:401,statusMessage:'Mot de passe actuel incorrect'})
  user.passwordHash=await bcrypt.hash(parsed.data.newPassword,12)
  await user.save()
  return {ok:true}
})
