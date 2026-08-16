import { z } from 'zod'
import { TestimonialModel } from '../models/Testimonial'
const schema=z.object({name:z.string().trim().min(2).max(120),role:z.string().trim().max(160).optional(),email:z.string().trim().email().max(320).optional().or(z.literal('')),text:z.string().trim().min(10).max(2000),rating:z.number().min(1).max(5).optional(),website:z.string().max(0).optional().default('')})
export default defineEventHandler(async event=>{
  assertRateLimit(event,'testimonial',3,60*60*1000)
  const parsed=schema.safeParse(await readBody(event))
  if(!parsed.success)throw createError({statusCode:400,statusMessage:'Vérifiez les champs de votre avis.'})
  await connectDb()
  await TestimonialModel.create({name:parsed.data.name,role:parsed.data.role,email:parsed.data.email||undefined,text:parsed.data.text,rating:parsed.data.rating,source:'site',status:'pending'})
  return {success:true}
})
