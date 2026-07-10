const mongoose = require('mongoose');


const blacklistSchema = mongoose.Schema({
    token:{
        type:String,
            required:[true,"token is required to added in blaclist"]
        }
        
    },{
            timestamps:true
        });

 
const tokenBlaclistModel = mongoose.model(blacklistSchema);


module.exports = tokenBlaclistModel;
