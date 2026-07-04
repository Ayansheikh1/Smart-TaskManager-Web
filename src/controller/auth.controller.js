const userModel = require('../models/user.model');



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
    return res.status(400).json({
        message:"Account is already registered"
    });
   }

   


}




module.exports = {registerUserController};