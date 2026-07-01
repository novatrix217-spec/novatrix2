import { ArticleModel } from '../../models/Article'
import { LeadModel } from '../../models/Lead'
import { ResourceModel } from '../../models/Resource'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();const [leads,resources,articles,newLeads]=await Promise.all([LeadModel.countDocuments(),ResourceModel.countDocuments(),ArticleModel.countDocuments(),LeadModel.countDocuments({status:'new'})]);return {leads,resources,articles,newLeads}})
