import { z } from 'zod'
import { ResourceModel } from '../../../models/Resource'
const schema=z.object({title:z.string().min(3).max(180),slug:z.string().optional(),description:z.string().min(10).max(1000),type:z.enum(['pdf','video','image','template','link']),sector:z.string().min(2).max(80),fileKey:z.string().min(2).max(500),coverImageKey:z.string().max(500).optional(),published:z.boolean().default(false)})
export default defineEventHandler(async event=>{await requireAdmin(event);const parsed=schema.safeParse(await readBody(event));if(!parsed.success)throw createError({statusCode:400,statusMessage:'Ressource invalide'});await connectDb();const item=await ResourceModel.create({...parsed.data,slug:slugifyFr(parsed.data.slug||parsed.data.title)});setResponseStatus(event,201);return item})
