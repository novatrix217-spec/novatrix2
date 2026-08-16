import { ArticleModel } from '../../models/Article'
import { LeadModel } from '../../models/Lead'
import { ProjectModel } from '../../models/Project'
import { ResourceModel } from '../../models/Resource'
import { TestimonialModel } from '../../models/Testimonial'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();const [leads,resources,articles,newLeads,projects,testimonialsPending]=await Promise.all([LeadModel.countDocuments(),ResourceModel.countDocuments(),ArticleModel.countDocuments(),LeadModel.countDocuments({status:'new'}),ProjectModel.countDocuments({status:'published'}),TestimonialModel.countDocuments({status:'pending'})]);return {leads,resources,articles,newLeads,projects,testimonialsPending}})
