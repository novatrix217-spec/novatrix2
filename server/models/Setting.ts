import mongoose from 'mongoose'
const { Schema,model,models }=mongoose
const SettingSchema=new Schema({key:{type:String,required:true,unique:true},value:{type:Schema.Types.Mixed}},{timestamps:true})
export const SettingModel=models.Setting||model('Setting',SettingSchema)
