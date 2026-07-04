const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already taken"],
        min:3,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:[true,"email already taken"],
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        min:8,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
   
});

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;