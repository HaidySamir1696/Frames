const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
      //  required:true
    },
    description:{
        type:String,
        trim:true
    },
    avatar:{
     // type:Buffer
     type:String
    }
    ,  avatar1:{
        // type:Buffer
        type:String
       },
       avatar2:{
        // type:Buffer
        type:String
       },
       avatar3:{
        // type:Buffer
        type:String
       }
    // owner:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'User'
    // }
}

)

const Product = mongoose.model("Product",productSchema)
module.exports = Product