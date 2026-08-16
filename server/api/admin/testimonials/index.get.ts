import { TestimonialModel } from '../../../models/Testimonial'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();return {items:await TestimonialModel.find().sort({status:1,sortOrder:1,createdAt:-1}).lean()}})
