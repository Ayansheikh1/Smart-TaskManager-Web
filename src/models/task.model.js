const mongoose = require('mongoose');
const { validate } = require('./user.model');

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:[3,"title must be at least 3 characters long"],
        maxlength:[100,"title cannot exceed 100 characters"],
        required:[true,"title is necessary"]
    },
    description:{
         type:String,
         trim:true,
    },
    status:{
        type:String,
        default:"Todo",
        enum:{
            values:["Todo","In Progress","Completed"],
            message:"status should be either Todo,In Progress or Completed"
        },
        
    },
    priority:{
        type:String,
        default:"Medium",
        enum:{
            values:["Low","Medium","High"],
            message:"priority should be either Low,Medium or High"
        },
       
    },
    dueDate:{
        type:Date,
        validate:{
            validator:function(value){
                return !value || value >= new Date();
            },
            message:"dueDate cannot be in the past"
        }


        
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"owner is necessary"],
        index: true
    }
},{
    timestamps:true
})

const taskModel = mongoose.model("tasks",taskSchema);

module.exports = taskModel;
    