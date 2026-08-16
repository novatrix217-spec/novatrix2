import { z } from 'zod'
import { TestimonialModel } from '../../../models/Testimonial'
const schema=z.object({name:z.string().min(2).max(120).optional(),role:z.string().max(160).optional(),text:z.string().min(10).max(2000).optional(),rating:z.number().min(1).max(5).optional(),status:z.enum(['pending','published','rejected']).optional(),sortOrder:z.number().optional()})
export default defineEventHandler(async event=>{await requireAdmin(event);const parsed=schema.safeParse(await readBody(event));if(!parsed.success)throw createError({statusCode:400,statusMessage:'Modification invalide'});await connectDb();const item=await TestimonialModel.findByIdAndUpdate(getRouterParam(event,'id'),parsed.data,{new:true});if(!item)throw createError({statusCode:404});return item})
