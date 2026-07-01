import { SettingModel } from '../../models/Setting'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();const items=await SettingModel.find().lean();return {items:items.map(i=>({key:i.key,value:i.value}))}})
