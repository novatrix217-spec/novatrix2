import { ArticleModel } from '../../models/Article'
import { demoArticles } from '../../../shared/demo'
export default defineEventHandler(async event=>{const slug=getRouterParam(event,'slug')!;try{await connectDb();const item=await ArticleModel.findOne({slug,status:'published'}).lean();if(item)return item}catch{}const demo=demoArticles.find(a=>a.slug===slug);if(!demo)throw createError({statusCode:404,statusMessage:'Article introuvable'});return demo})
