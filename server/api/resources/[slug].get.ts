import { ResourceModel } from '../../models/Resource'
import { demoResources } from '../../../shared/demo'
export default defineEventHandler(async event=>{const slug=getRouterParam(event,'slug')!;try{await connectDb();const item=await ResourceModel.findOne({slug,published:true}).lean();if(item)return item}catch{}const demo=demoResources.find(r=>r.slug===slug);if(!demo)throw createError({statusCode:404,statusMessage:'Ressource introuvable'});return demo})
