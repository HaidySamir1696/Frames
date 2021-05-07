const express = require('express')
const Product = require('../models/product.js');
const router = new express.Router()
const multer = require('multer')
const auth = require('../middleware/auth')

// Post
router.post('/products',async(req,res)=>{
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(200).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

// Relation 

// router.post('/tasks',auth,async(req,res)=>{
//     // const task = new Task(req.body)
//     const task = new Task({
//         // spread operator --> Take copy of our data and add it to the object
//         ...req.body
//     })
//     try{
//         await task.save()
//         res.status(200).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// Get All
// router.get('/tasks',async(req,res)=>{
//     try{
//         // 1st way
//         // const tasks = await Task.find({owner:req.user._id})
//        // res.send(tasks)

//         await req.user.populate('tasks').execPopulate()
//         res.send(req.user.tasks)

//     }catch(e){
//         res.status(500).send(e)
//     }
// })

////////////////////////////////////////////////////////////////////////////
router.get('/products',async(req,res)=>{
    try{
        const products = await Product.find({})
        res.send(products)
    }catch(e){
        res.status(500).send(e)
    }
})
// filter
// get/tasks/?completed=false
// router.get('/tasks',auth,async(req,res)=>{
//     try{
//         // 1st way
//         // const tasks = await Task.find({owner:req.user._id})
//        // res.send(tasks)
        
//        // Note --> values req.query is always string 
//        // === check type /value
//        // Match --> filter
//        const match = {}
//        if(req.query.completed){
//            match.completed = req.query.completed === 'true'  // true / false
//        }
        
//        // localhost:3000/tasks?sortBy=name:asc
//        // sortBy --> query
//        // createdAt --> value which i am using in sorting
//        // desc / asc


//        // Sort  --> ['name','asc']
//        const sort = {}
//        if(req.query.sortBy){
//           const parts = req.query.sortBy.split(':')
//         //   sort.createdAt
//         //   sort.name       'desc'  === 'desc'  --> 1
//           sort[parts[0]] = parts[1]  === 'desc' ? -1 : 1
          

//        }


//        // await req.user.populate('tasks').execPopulate()
//         await req.user.populate({
//             path: 'tasks',
//             // match:{
//             //     completed:true
//             // }
//             match, // shothand property
//             options:{
//                 limit:parseInt(req.query.limit),
//                 skip:parseInt(req.query.skip),
//                 // sort:{
//                 //     createdAt:-1 // sort from new to old  --> -1 desc (new->old)  / 1 asc(old->new)
//                 // }
//                 sort:sort
//             }

//         })
//         .execPopulate()
//         res.send(req.user.tasks)

//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// Get by id
router.get('/products/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Product.findOne({_id})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

// Edit by id
router.patch('/products/:id', auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try{
        // const task = await Task.findById(req.params.id)
        const task = await Product.findOne({_id})
        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    }
    catch(e){
        res.status(400).send()
    }
})

// Delete by id 

router.delete('/products/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const product = await Product.findOneAndDelete({_id})
        if(!product){
          return  res.status(404).send()
        }
        res.send(product)

    }catch(e){
        res.status(500).send
    }
})
//////////
const MIME_TYPE_MAP = {  
    'avatar/png': 'png',  
    'avatar/jpeg': 'jpg',  
    'avatar/jpg': 'jpg'  
  }; 

const storage = multer.diskStorage({  
    destination: (req, file, cb)=>{  
        const isValid = MIME_TYPE_MAP[file.mimetype]; 
        let error = new Error("Invalid Mime Type");  
    if(isValid){  
      error = null;  
    }  
        cb(null, "src/images"); 
    }  ,
    filename: (req, file, cb)=>{  
        const name = file.originalname.toLowerCase().split(' ').join('_');  
        const ext = MIME_TYPE_MAP[file.mimetype];  
        cb(null, name); 
    }
  });

///////////////
const uploads = multer({
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

// router.post('/project/avatar',multer({storage:storage}).single('avatar'),async(req,res)=>{
//     const url = req.protocol + '://'+ req.get("host");
//     const task = new Task({
//         title:req.body.title,
//         description:req.body.description,
//         productID:req.body.productID,
//         avatar:url+"/images/"+req.file.filename

//     })

//     try{

//         await task.save()
//         res.status(200).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     /// console.log(e)
//     }
//     // try{ 
//     // .avatar = req.file.buffer
//     // await req.user.save()
//     // res.send()
//     // }catch(e){
//     //     res.send(e)
//     // }
  
    

// })

//////////
// router.post('/project/avatar',multer({storage:storage}).single('avatar'),async(req,res)=>{
//     const url = req.protocol + '://'+ req.get("host");
//     const task = new Task({
//         title:req.body.title,
//         description:req.body.description,
//         productID:req.body.productID,
//         avatar:url+"/images/"+req.file.filename

//     })

//     try{

//         await task.save()
//         res.status(200).send(task)
//     }catch(e){
//         res.status(400).send(e)
//     /// console.log(e)
//     }
//     // try{ 
//     // .avatar = req.file.buffer
//     // await req.user.save()
//     // res.send()
//     // }catch(e){
//     //     res.send(e)
//     // }
  
    

// })

//new
router.post('/product/avatar',auth,multer({storage:storage}).array('avatar'),async(req,res)=>{
    // const files=req.files
      const url = req.protocol + '://'+ req.get("host");
      var avatar=null
      var avatar1=null
      var avatar2=null
      var avatar3=null
     if(!req.files[0])
     {
       avatar=null
     }
     else
     {
         avatar=url+"/images/"+req.files[0].filename
     }
     if(!req.files[1])
     {
       avatar1=null
     }
     else
     {
         avatar1=url+"/images/"+req.files[1].filename
     }
     if(!req.files[2])
     {
       avatar2=null
     }
     else
     {
         avatar2=url+"/images/"+req.files[2].filename
     }
     if(!req.files[3])
     {
       avatar3=null
     }
     else
     {
         avatar3=url+"/images/"+req.files[3].filename
     }
      const product = new Product({
          title:req.body.title,
          description:req.body.description,
          productID:req.body.productID,
          avatar:avatar,
          avatar1:avatar1,
          avatar2:avatar2,
          avatar3:avatar3
  
      })
  
      try{
  
          await product.save()
          res.status(200).send(product)
      }catch(e){
          res.status(400).send(e)
      /// console.log(e)
      }
      // try{ 
      // .avatar = req.file.buffer
      // await req.user.save()
      // res.send()
      // }catch(e){
      //     res.send(e)
      // }
    
      
  
  })
//old
// router.post('/product/avatar',multer({storage:storage}).array('avatar'),async(req,res)=>{
//   // const files=req.files
//     const url = req.protocol + '://'+ req.get("host");
//     const product = new Product({
//         title:req.body.title,
//         description:req.body.description,
//         productID:req.body.productID,
//         avatar:url+"/images/"+req.files[0].filename,
//         avatar1:url+"/images/"+req.files[1].filename,
//         avatar2:url+"/images/"+req.files[2].filename,
//         avatar3:url+"/images/"+req.files[3].filename

//     })

//     try{

//         await product.save()
//         res.status(200).send(product)
//     }catch(e){
//         res.status(400).send(e)
//     /// console.log(e)
//     }
//     // try{ 
//     // .avatar = req.file.buffer
//     // await req.user.save()
//     // res.send()
//     // }catch(e){
//     //     res.send(e)
//     // }
  
    

// })
module.exports = router
