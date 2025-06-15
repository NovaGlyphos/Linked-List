const mongoose = require('mongoose');
const validator = require('validator');


//Schema of the collection
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        requried:true,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid!!!")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid!!!");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Not a valid photo url");
            }
        }
    },
    about:{
        type:String,
        default:"This is default about of a user"
    },
    skills:{
        type:[String],
    }
},{timestamps:true});

const userModel = mongoose.model("User",userSchema);  // User is the name of the model

module.exports = userModel;
