const express = require('express')
const Task = require('../models/task.js');
const router = new express.Router()
const multer = require('multer')
const auth = require('../middleware/auth')

// Post
router.post('/projects',async(req,res)=>{
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
router.get('/projects',async(req,res)=>{
    try{
        const tasks = await Task.find({})
        res.send(tasks)
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
router.get('/projects/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

// Edit by id
router.patch('/projects/:id', auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try{
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({_id})
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

router.delete('/projects/:id',async(req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findOneAndDelete({_id})
        if(!task){
          return  res.status(404).send()
        }
        res.send(task)

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
/////////
router.post('/project/avatar',multer({storage:storage}).single('avatar'),async(req,res)=>{
    const url = req.protocol + '://'+ req.get("host");
    var avatar=null
    const file=req.file
   if(!file)
   {
     avatar=null
   }
   else
   {
       avatar=url+"/images/"+req.file.filename
   }
    const task = new Task({
        title:req.body.title,
        productID:req.body.productID,
        consultant:req.body.consultant,
        owner:req.body.owner,
        location:req.body.location,
        avatar:avatar

    })

    try{

        await task.save()
        res.status(200).send(task)
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

// router.post('/product/avatar',multer({storage:storage}).array('avatar'),async(req,res)=>{
//   // const files=req.files
//     const url = req.protocol + '://'+ req.get("host");
//     const task = new Task({
//         title:req.body.title,
//         description:req.body.description,
//         productID:req.body.productID,
//         avatar:url+"/images/"+req.files[0].filename,
//         avatar1:url+"/images/"+req.files[1].filename,
//         avatar2:url+"/images/"+req.files[2].filename

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
module.exports = router
