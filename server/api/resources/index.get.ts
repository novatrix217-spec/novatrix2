import { ResourceModel } from '../../models/Resource'
import { demoResources } from '../../../shared/demo'
export default defineEventHandler(async event=>{
  const query=getQuery(event),filter:any={published:true};if(query.type)filter.type=String(query.type);if(query.sector)filter.sector=String(query.sector)
  try{await connectDb();const items=await ResourceModel.find(filter).sort({createdAt:-1}).limit(Math.min(Number(query.limit)||50,100)).lean();return {items:items.length?items:demoResources.filter(r=>(!query.type||r.type===query.type)&&(!query.sector||r.sector===query.sector))}}catch{return {items:demoResources}}
})
