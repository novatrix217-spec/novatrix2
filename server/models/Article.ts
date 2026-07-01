import mongoose from 'mongoose'
const { Schema,model,models }=mongoose
const ArticleSchema=new Schema({title:{type:String,required:true},slug:{type:String,required:true,unique:true,index:true},excerpt:{type:String,required:true},body:{type:String,required:true},coverImageKey:String,category:{type:String,required:true,index:true},tags:{type:[String],default:[]},readingTime:{type:Number,required:true},seo:{metaTitle:String,metaDescription:String,ogImage:String,canonical:String},status:{type:String,enum:['draft','published'],default:'draft',index:true},source:{type:String,enum:['manual','automation'],default:'manual'},publishedAt:Date},{timestamps:true})
export const ArticleModel=models.Article||model('Article',ArticleSchema)
