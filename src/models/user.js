const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    first_name:{
        type:String,
        required:[true,'first name is required']
    },
    last_name:{
        type:String,
        required:[true,'last name is required']
    },
    image:{
        type:String,
        required:[true,'image file is required']
    },
    age:{
        type:Number,
        required:[true,'age is required']
    },
    status:{
        type:Boolean,
        default:true
    },
    order:{
        type:Number,
        default:null
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    updated_at:{
        type:Date,
        default:Date.now()
    },
    deleted_at:{
        type:Date,
        default:''
    }


    
})

const userModel = mongoose.model('users',userSchema)

module.exports=userModel;
