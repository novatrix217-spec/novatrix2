import { z } from 'zod'
import { LeadModel } from '../../../models/Lead'
const schema=z.object({status:z.enum(['new','contacted','qualified','won','lost'])})
export default defineEventHandler(async event=>{await requireAdmin(event);const parsed=schema.safeParse(await readBody(event));if(!parsed.success)throw createError({statusCode:400});await connectDb();return LeadModel.findByIdAndUpdate(getRouterParam(event,'id'),parsed.data,{new:true})})
