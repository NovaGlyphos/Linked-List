const mongoose = require('mongoose');


//Schema of the collection
const userSchema = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }
});

const userModel = mongoose.model("User",userSchema);  // User is the name of the model

module.exports = userModel;
