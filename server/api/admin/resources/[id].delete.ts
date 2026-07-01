import { ResourceModel } from '../../../models/Resource'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();await ResourceModel.findByIdAndDelete(getRouterParam(event,'id'));return {success:true}})
