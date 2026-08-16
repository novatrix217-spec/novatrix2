import { TestimonialModel } from '../../../models/Testimonial'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();await TestimonialModel.findByIdAndDelete(getRouterParam(event,'id'));return {success:true}})
