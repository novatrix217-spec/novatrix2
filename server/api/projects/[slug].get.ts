import { ProjectModel } from '../../models/Project'
import { demoProjects } from '../../../shared/demo'
export default defineEventHandler(async event=>{
  const slug=getRouterParam(event,'slug')
  try{await connectDb();const item=await ProjectModel.findOne({slug,status:'published'}).lean();if(item)return item}catch{}
  const fallback=demoProjects.find(p=>p.slug===slug)
  if(!fallback)throw createError({statusCode:404,statusMessage:'Réalisation introuvable'})
  return fallback
})
