const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
      //  required:true
    },
    productID:{
        type:String
    },
    
    consultant:{
        type:String
    },
    owner:{
        type:String
    },
    location:{
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