import mongoose from 'mongoose'
const { Schema,model,models }=mongoose
const UserSchema=new Schema({name:{type:String,required:true},email:{type:String,required:true,unique:true,lowercase:true},passwordHash:{type:String,required:true},role:{type:String,enum:['admin','editor'],default:'editor'},lastLoginAt:Date},{timestamps:true})
export const UserModel=models.User||model('User',UserSchema)
