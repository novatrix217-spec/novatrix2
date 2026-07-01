import { ArticleModel } from '../../../models/Article'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();await ArticleModel.findByIdAndDelete(getRouterParam(event,'id'));return {success:true}})
