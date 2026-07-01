import { ResourceModel } from '../../../models/Resource'
export default defineEventHandler(async event=>{await requireAdmin(event);await connectDb();return {items:await ResourceModel.find().sort({createdAt:-1}).lean()}})
