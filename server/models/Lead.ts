import mongoose from 'mongoose'
const { Schema,model,models }=mongoose
const LeadSchema=new Schema({firstName:{type:String,required:true,trim:true},email:{type:String,required:true,lowercase:true,trim:true,index:true},phone:{type:String,required:true},domain:{type:String,required:true},message:String,consent:{type:Boolean,required:true},resourceId:{type:Schema.Types.ObjectId,ref:'Resource'},resourceSlug:String,source:{type:String,enum:['resource','contact','newsletter'],required:true},utm:{source:String,medium:String,campaign:String},ip:String,userAgent:String,status:{type:String,enum:['new','contacted','qualified','won','lost'],default:'new'},syncedToCrm:{type:Boolean,default:false},createdAt:{type:Date,default:Date.now,index:true}})
LeadSchema.index({email:1,resourceId:1},{unique:true,partialFilterExpression:{resourceId:{$type:'objectId'}}})
export const LeadModel=models.Lead||model('Lead',LeadSchema)
