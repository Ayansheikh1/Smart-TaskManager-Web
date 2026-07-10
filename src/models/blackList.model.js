const mongoose = require('mongoose');


const blacklistSchema = mongoose.Schema({
    token:{
        type:String,
            required:[true,"token is required to added in blaclist"]
        }
        
    },{
            timestamps:true
        });

 
const tokenBlaclistModel = mongoose.model("blacklistTokens",blacklistSchema);


module.exports = tokenBlaclistModel;
