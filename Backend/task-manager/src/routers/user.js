const express = require('express')
const { aggregate } = require('../models/user')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')

// router.post('/users',(req,res)=>{
//     console.log(req.body)
//     res.send('testing')
// })

// Post
// router.post('/users',(req,res)=>{
//     const user = new User(req.body)
//     user.save().then(()=>{
//         res.status(200).send({user,token})
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })

router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateToken()
        res.status(200).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }

})
///////////////////////////////////////////////////////////////////////////////

// Get 

router.get('/users',auth,(req,res)=>{
    User.find({}).then((users)=>{
        res.status(200).send(users)
    }).catch((e)=>{
        res.status(500).send('Inetrnal server error')
    })
})

////////////////////////////////////////////////////////////////////////////////

// Get by id

router.get('/users/:id',(req,res)=>{
    // console.log(req.params)
    // console.log(req.params.id)
    const _id = req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(400).send('Unable to find user')
        }
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send('Internal server error')
    })
})

////////////////////////////////////////////////////////////////////////////////////

// update

// router.patch('/users/:id' , async(req,res) =>{
//     const _id = req.params.id
//     try{
//     const user = await User.findByIdAndUpdate(_id,req.body,{
//         new:true,
//         runValidators:true
//     })
//     if(!user){
//         return res.send('No user is found')
//     }
//     res.status(200).send(user)
//     } catch(e){
//         res.status(400).send('Error has occurred')
//     }
// })

/////////////////////////////////////////////////////////////////////////////////////////////

// update with some restrictions

router.patch('/users/:id', async(req,res)=>{
    // Return keys of your body
    const updates = Object.keys(req.body) // ['name' , 'age' , 'email']
    console.log(updates)
    const allowedUpdates = ['name','password']
    // check if values in updates array are avaliable in allowedUpdates array
    /**For every element in updates array check if that element is avaliable in
     * allowedUpdates array
     */
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
      return  res.status(400).send("can\'t update")
    }
    const _id = req.params.id
    try{
        
        const user = await User.findById(_id)
        console.log(user)
        updates.forEach((update)=> user[update] = req.body[update])
        await user.save()

    // findByIdAndUpdate bypass middleware 


    // const user = await User.findByIdAndUpdate(_id,req.body,{
    //     new:true,
    //     runValidators:true
    // })
    if(!user){
        return res.send('No user is found')
    }
    res.status(200).send(user)
    } catch(e){
        res.status(400).send('Error has occurred')
    }
})



/////////////////////////////////////////////////////////////////////////////////////

// Delete by id

router.delete('/users/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(400).send('Not found')
        }
        res.status(200).send(user)
    }
    catch(e){
        res.send(e)
    }
})



//////////////////////////////////////////////////////////////////////////////////////

// login

router.post('/users/login',async (req,res)=>{

    try{
    const user = await User.findByCredentials(req.body.name,req.body.password)
    const token = await user.generateToken()
    res.send({user,token})
    }
    catch(error){
        // res.status(400).send('Error has occurred' + error)
        res.status(400).send('Unable to login please check password and email')
    }

})

////////////////////////////////////////////////////////////////////////

router.get('/profile',auth,async(req,res)=>{
    res.send(req.user)
    // res.send({user:req.user.getProfile()})
})

/////////////////////////////////////////////////////////////////////////

// logout 

router.post('/logout',auth,async(req,res)=>{
    try{ req.user.tokens = req.user.tokens.filter((el)=>{
        // 12    12 !== 123 T
        // 1      1 !== 123 T
        // 2      2  !== 123 T
        // 123    123 !== 123 F
        // If value of el.token is not equal req.token then keep it otherwise remove it
        return el.token !== req.token
    })
    await req.user.save()
    res.send('Logout successfully')
}
    catch(e){
        res.status(500).send('please login')
    }  

})

router.post('/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('Logout all was done successfully')
    }
    catch(e){
        res.status(500).send('Please login')
    }
})

////////////////////////////////////////////////////////////////////

// Delete profile
router.delete('/profile',auth,async(req,res)=>{
    try{
        await req.user.remove()
        res.send('Profile was deleted')
    }catch(e){
        res.send(e)
    }
})
///////////////////////////////////////////////////////////////////

// Update Profile 
router.patch('/profile',auth,async(req,res)=>{

    const updates = Object.keys(req.body)
    try{
        updates.forEach((update)=>(req.user[update]=req.body[update]))
        await req.user.save()
        res.status(200).send(req.user)
    } catch(e){
        req.status(400).send(e)
    }

})

////////////////////////////////////////////////////////////////////////

// const uploads = multer({
//     limits:{
//       fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//       if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
//         return cb(new Error('Please upload an image'))
//       }
//       cb(undefined,true)
//     }
//   })



// router.post('/profile/avatar',auth,uploads.single('avatar'),async(req,res)=>{

//     try{ 
//     req.user.avatar = req.file.buffer
//     await req.user.save()
//     res.send()
//     }catch(e){
//         res.send(e)
//     }
  
    

// })



module.exports = router