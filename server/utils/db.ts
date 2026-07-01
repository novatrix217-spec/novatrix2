import mongoose from 'mongoose'
let connection:Promise<typeof mongoose>|null=null
export function databaseConfigured(){return Boolean(useRuntimeConfig().mongodbUri)}
export async function connectDb(){
  const uri=useRuntimeConfig().mongodbUri
  if(!uri)throw createError({statusCode:503,statusMessage:'MongoDB non configuré'})
  if(mongoose.connection.readyState===1)return mongoose
  connection ||= mongoose.connect(uri,{serverSelectionTimeoutMS:5000,maxPoolSize:10})
  try{return await connection}catch(error){connection=null;throw error}
}
