import mongoose from 'mongoose'
const { Schema,model,models }=mongoose
const ResourceSchema=new Schema({title:{type:String,required:true,trim:true},titleEn:String,slug:{type:String,required:true,unique:true,index:true},description:{type:String,required:true},descriptionEn:String,type:{type:String,enum:['pdf','video','image','template','link'],required:true},sector:{type:String,required:true,index:true},sectorEn:String,fileKey:{type:String,required:true},coverImageKey:String,gateFields:{type:[String],default:['firstName','email','phone','domain']},published:{type:Boolean,default:false,index:true},leadCount:{type:Number,default:0}},{timestamps:true})
export const ResourceModel=models.Resource||model('Resource',ResourceSchema)
