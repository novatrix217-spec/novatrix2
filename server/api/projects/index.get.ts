import { ProjectModel } from '../../models/Project'
import { demoProjects } from '../../../shared/demo'
export default defineEventHandler(async event=>{
  const query=getQuery(event),filter:any={status:'published'};if(query.category)filter.category=String(query.category);if(query.featured==='true')filter.featured=true
  try{await connectDb();const items=await ProjectModel.find(filter).sort({featured:-1,sortOrder:1,createdAt:-1}).limit(Math.min(Number(query.limit)||100,200)).lean();return {items:items.length?items:demoProjects.filter(p=>(!query.category||p.category===query.category)&&(query.featured!=='true'||p.featured))}}catch{return {items:demoProjects}}
})
