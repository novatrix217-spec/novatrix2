import { ProjectModel } from '../../../models/Project'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();await ProjectModel.findByIdAndDelete(getRouterParam(event,'id'));return {success:true}})
