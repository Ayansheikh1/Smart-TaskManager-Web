const userModel = require('../models/user.model');
const tokenBlaclistModel = require('../models/blackList.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { default: mongoose } = require('mongoose');



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

   const token = jwt.sign(
    {id:user._id,username:user.username},//payload
    process.env.JWT_SECRET_KEY, //secret key
    {expiresIn:"1d"}
   )

   res.cookie("token",token);

   

   return res.status(201).json({
    message:"User registered successully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
   })

   


}


/**
 * @name loginUserController
 * @description login user 
 * @access public
 */

async function loginUserController(req,res){
    const {email,password} = req.body;

    if(!email || !password){
       return res.status(400).json({
            message:"please provide email and password"
        })
    }

    const user = await userModel.findOne({email});

    if(!user){
       return res.status(400).json({
            message:"user not found"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message:"inavlid password"
        });


    }

     const token = jwt.sign(
    {id:user._id,username:user.username},//payload
    process.env.JWT_SECRET_KEY, //secret key
    {expiresIn:"1d"}
   )

   res.cookie("token",token);

    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description logout user 
 * @access public
 */
async function logoutUserController(req,res) {
   
    const token = req.cookies.token;
    if(token){
        await tokenBlaclistModel.create({token});
    }
   res.clearCookie("token");

   res.status(200).json({
    message:"User logOut successfully "
   })
}




module.exports = {registerUserController,loginUserController,logoutUserController};