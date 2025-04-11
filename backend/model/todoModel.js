import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})

const todoModel = mongoose.models.todo || mongoose.model('todo',todoSchema)

export default todoModel
