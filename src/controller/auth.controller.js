const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')



/**
 * @name registerUserController
 * @description register a new user expects username ,email and password
 * @access public
 */
async function registerUserController(req,res){
   const {username,email,password} = req.body;

   if(!username || !email || !password){
    return res.status(400).json({
        message:"please provide username,email and password"
    });
   }

   const isUserAlreadyExist = await userModel.findOne({
    $or:[{email},{username}]
   });

   if(isUserAlreadyExist){
    return res.status(409).json({
        message:"Account is already registered"
    });
   }

   const hash = await bcrypt.hash(password,10);

   const user = await userModel.create({
    username,
    email,
    password:hash,
    
   })
   

   return res.status(201).json({
    message:"User registered successully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
   })

   


}




module.exports = {registerUserController};