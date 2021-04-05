const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required:true,
      unique:true,
      trim:true
    },
    // age: {
    //   type: Number,
    //    default:29,
    //   required:true,
    //   validate(value){
    //     if(value<0){
    //       throw new Error ('Age must be a positive number')
         
    //     }
    //   }
    // },
    email:{
      type:String,
      unique:true,
      required:true,
      lowercase:true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error('Email is invalid')
        }
      }
    },
    password:{
      type:String,
      required:true,
      trim:true,
      minLength:6,
      validate(value){
        if(value.toLowerCase().includes('password')){
          throw new Error ('Password can\'t contain word password')
        }
      }
    },
    // Kepp trace od user tokens
    tokens:[{
      token:{
        type:String,
        required:true
      }
    }]
    //,
    // avatar:{
    //   type:Buffer
    // }
})

/////////////////////////////////////////////////////////////////////////

// Relation

userSchema.virtual('tasks',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'

})

// userSchema.virtual('courses',{
//   ref:'Course',
//   localField:'_id',
//   foreignField:'ownerofcourse --> Exist in courses model'

// })

// Doing sth before event --> pre
// Doing sth before event --> post

userSchema.pre('save',async function(next){
   const user = this
  //  console.log(user)

   // Check if password was modified --> in case password modified (Hashing)
   // Otherwise (not modified)
   if(user.isModified('password')){
     user.password = await bcrypt.hash(user.password,8)
   }
   // Sepefcigy that we have finished 
   next()
})

/////////////////////////////////////////////////////////////////////////////////////

//class User {
  //   statics name
  //   statics  age
  //   statics  getName(){
  
  //     }
  // }
  
  // obj = new User()
  // obj.name
  // obj.age
  // obj.getName()
  
  // User.name
  // User.age
  // User.getName()
//////////////////////////////////////////////////////////////////////////////////////

// Find by credintalis -->login

userSchema.statics.findByCredentials = async(name,password) =>{

  // cretira {age:24}
  const user = await User.findOne({name:name})
  if(!user){
    throw new Error('Email is incorrect')
  }

  const isMatch = await bcrypt.compare(password,user.password)

  if(!isMatch){
    throw new Error('Password is incorrect')
  }

 return user

}
///////////////////////////////////////////////////////////////////////////////////////

// Genratetoken Function

userSchema.methods.generateToken = async function(){
  const user = this
  const token = jwt.sign({_id:user._id.toString()},'node course')
  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

////////////////////////////////////////////////////////////////////////

// Hide private Data
//userSchema.methods.getProfile 
userSchema.methods.toJSON = function(){
  // Document 
  const user = this

  // Object --> toObject() convert docuemnt in to an object
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject

}




const User = mongoose.model("User", userSchema);
module.exports = User