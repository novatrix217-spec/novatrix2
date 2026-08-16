import { TestimonialModel } from '../../models/Testimonial'
import { demoTestimonials } from '../../../shared/demo'
export default defineEventHandler(async event=>{
  const query=getQuery(event)
  try{await connectDb();const items=await TestimonialModel.find({status:'published'}).select('-email').sort({sortOrder:1,createdAt:-1}).limit(Math.min(Number(query.limit)||50,100)).lean();return {items:items.length?items:demoTestimonials}}catch{return {items:demoTestimonials}}
})
