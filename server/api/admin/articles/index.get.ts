import { ArticleModel } from '../../../models/Article'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();return {items:await ArticleModel.find().sort({createdAt:-1}).lean()}})
