import { z } from 'zod'
import { ProjectModel } from '../../../models/Project'
import { slugifyFr } from '../../../utils/slug'
const quote=z.object({text:z.string().min(3).max(600),author:z.string().max(160).optional()})
const metric=z.object({value:z.string().min(1).max(40),label:z.string().min(1).max(120)})
const schema=z.object({title:z.string().min(3).max(180),slug:z.string().optional(),category:z.string().min(2).max(80),summary:z.string().min(10).max(400),challenge:z.string().max(2000).optional(),solution:z.string().max(2000).optional(),features:z.array(z.string().max(200)).max(12).optional(),quoteBefore:quote.optional(),quoteAfter:quote.optional(),resultsMetrics:z.array(metric).max(6).optional(),tools:z.array(z.string().max(60)).max(20).optional(),deliveryDays:z.number().min(1).max(365).optional(),coverImageKey:z.string().max(500).optional(),status:z.enum(['draft','published']).default('draft'),featured:z.boolean().default(false)})
export default defineEventHandler(async event=>{await requireAdmin(event);const parsed=schema.safeParse(await readBody(event));if(!parsed.success)throw createError({statusCode:400,statusMessage:'Réalisation invalide'});await connectDb();const item=await ProjectModel.create({...parsed.data,slug:slugifyFr(parsed.data.slug||parsed.data.title),source:'manual'});setResponseStatus(event,201);return item})
