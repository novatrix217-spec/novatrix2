import { z } from 'zod'
import { SettingModel } from '../../models/Setting'
const schema=z.object({items:z.array(z.object({key:z.string().min(2).max(100),value:z.any()})).max(50)})
export default defineEventHandler(async event=>{await requireAdmin(event);const parsed=schema.safeParse(await readBody(event));if(!parsed.success)throw createError({statusCode:400});await connectDb();await Promise.all(parsed.data.items.map(i=>SettingModel.updateOne({key:i.key},{$set:{value:i.value}},{upsert:true})));return {success:true}})
