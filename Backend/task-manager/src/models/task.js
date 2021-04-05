const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
      //  required:true
    },
    description:{
        type:String,
        trim:true
    },
    productID:{
        type:String
    },
    avatar:{
     // type:Buffer
     type:String
    }
    // owner:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'User'
    // }
},


{
    timestamps: true,


})

const Task = mongoose.model("Task",taskSchema)
module.exports = Task