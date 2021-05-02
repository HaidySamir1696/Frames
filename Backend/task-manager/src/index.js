const express = require('express')
const User = require('./models/user')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const productRouter = require('./routers/product')
const Task = require('./models/task')

const cors = require('cors')

// Connect to db
require('./db/mongoose')

// Intalize varible store to our express app
const app = express()
app.use(cors())
// Express will automatically parse JSON for us
app.use(express.json())

// app.use((req,res,next)=>{
//   console.log('Hello form middleware')
//   next()
// })
// Register to our routers
app.use(userRouter)

app.use(productRouter)

app.use(taskRouter)
const path = require("path");  
app.use("/images", express.static(path.join("src/images")));

// Declare port
const port = 3000

// Create to an instance
// const user = new User({
// name:'Ali',
// age:40,
// email:'farah@gmail.com',
// password:'farah123'
// });
// user.save().then(() => {
//     console.log(user);
//   }).catch((error) => console.log("Error",error));


  // app.post('/users',(req,res)=>{
  //     res.send('testing')
  // })

  ////////////////////////////////////////////////////////////////////////////////////

  // Bcrypt 
  // const bcrypt = require('bcryptjs')

  // const passWordFunction = async() =>{
  //   const password ='R123456'
  //   console.log(password)

  //   const hashedPassword = await bcrypt.hash(password,8)
  //   console.log(hashedPassword)

  //  const compare = await bcrypt.compare(password,hashedPassword)
  //  console.log(compare)
  // }

  
  // passWordFunction()

  ///////////////////////////////////////////////////////////////////////////////////

  // Authorization --> Sign up 
  // Authentication --> Login (Check user is authorized)

  // Jsonwebtoken

  // const jwt = require('jsonwebtoken')

  // const myToken = async ()=>{
  //   const token = jwt.sign({_id:'123'},'node-course',{expiresIn: '7 days'})
  //   console.log(token)  
  //   const tokenVerify = jwt.verify(token,'node-course')
  //   console.log(tokenVerify)
  // }
  // myToken()

  ///////////////////////////////////////////////////////////////////////////////////////

  // Express middleware

  // Without Express middleware
  // new request --> run route hanlder

  // With Express middlware
  // new request --> do sth (check token is valid) --> run route hanlder

  //////////////////////////////////////////////////////////////////////////

  // Get whole profile 

  const main = async () =>{
    // In case you want to retrive whole profile --> ref:'User' (Model)

    // const task = await Task.findById('6004b69489b9ee3fa4669e00')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('60042cdfc05f2d3840e99603')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
  }
  main()

  ////////////////////////////////////////////////////////////////////////

  // File uploads

  const multer = require('multer')

  const uploads = multer({
    dest:'images',
    limits:{
      fileSize:1000000
    },
    fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
        return cb(new Error('Please upload an image'))
      }
      cb(undefined,true)
    }

  })

  app.post('/uploads',uploads.single('uploads'),(req,res)=>{
    try{
      res.send()
    }catch(e){
      res.status(400).send(e)
    }
    
  })

app.listen(port,()=>console.log('Server is running'))