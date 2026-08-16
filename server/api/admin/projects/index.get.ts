import { ProjectModel } from '../../../models/Project'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();return {items:await ProjectModel.find().sort({sortOrder:1,createdAt:-1}).lean()}})
