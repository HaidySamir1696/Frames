// const auth = async(req,res,next)=>{
//     console.log('Auth Middleware')
//     next()
// }

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async(req,res,next)=>{
    try{
        // Get token from req.header / extract
        const token = req.header('Authorization').replace('Bearer ','')
        console.log(token)

        // //Check token valid
        // const decode = jwt.verify(token,'node course')
        
        // // get user who is carrying thid token
        // const user = await User.findOne({_id:decode._id , 'tokens.token':token})
        // //console.log(user)
        // if(!user){
        //     throw new Error()
        // }
        // req.user = user

        // req.token = token
        next()

    }
    catch(e){
        res.status(401).send({error:'Please authenticate'})
    }
}


module.exports = auth