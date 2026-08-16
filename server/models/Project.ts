import mongoose from 'mongoose'
const { Schema,model,models }=mongoose
const MetricSchema=new Schema({value:{type:String,required:true},label:{type:String,required:true}},{_id:false})
const QuoteSchema=new Schema({text:{type:String,required:true},author:String},{_id:false})
const ProjectSchema=new Schema({
  title:{type:String,required:true,trim:true},
  titleEn:String,
  slug:{type:String,required:true,unique:true,index:true},
  category:{type:String,required:true,index:true},
  categoryEn:String,
  summary:{type:String,required:true},
  summaryEn:String,
  challenge:String,
  challengeEn:String,
  solution:String,
  solutionEn:String,
  features:{type:[String],default:[]},
  featuresEn:{type:[String],default:[]},
  quoteBefore:QuoteSchema,
  quoteBeforeEn:QuoteSchema,
  quoteAfter:QuoteSchema,
  quoteAfterEn:QuoteSchema,
  resultsMetrics:{type:[MetricSchema],default:[]},
  tools:{type:[String],default:[]},
  deliveryDays:Number,
  coverImageKey:String,
  status:{type:String,enum:['draft','published'],default:'draft',index:true},
  featured:{type:Boolean,default:false,index:true},
  sortOrder:{type:Number,default:0},
  source:{type:String,enum:['comeup','manual'],default:'manual'},
},{timestamps:true})
export const ProjectModel=models.Project||model('Project',ProjectSchema)
