import mongoose from 'mongoose'
const { Schema,model,models }=mongoose
const TestimonialSchema=new Schema({
  name:{type:String,required:true,trim:true},
  role:{type:String,trim:true},
  roleEn:{type:String,trim:true},
  email:{type:String,trim:true,lowercase:true},
  text:{type:String,required:true},
  textEn:String,
  rating:{type:Number,min:1,max:5},
  status:{type:String,enum:['pending','published','rejected'],default:'pending',index:true},
  source:{type:String,enum:['comeup','site'],default:'site'},
  reviewDate:Date,
  sortOrder:{type:Number,default:0},
},{timestamps:true})
export const TestimonialModel=models.Testimonial||model('Testimonial',TestimonialSchema)
