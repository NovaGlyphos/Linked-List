const express = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const profileRouter = express.Router();



profileRouter.get("/profile/view",async (req,res)=>{
    try{
        //Get the cookie
        const cookies = req.cookies;
        //Extract the token from cookie
        const {token} = cookies;
        // console.log(token)
        if(!token){
            return res.status(401).send("Please login again")
        } 
        const decodedData = jwt.verify(token,"SecretKey");
        // console.log(decodedData);
        if(!decodedData){
            throw new Error("Invalid token");
        }
        const {_id} = decodedData;
        console.log(_id)
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User doent exist");
        }
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

profileRouter.patch("/profile/edit",async (req,res)=>{
    try{
        //Get the user data from req.body
        const userId = req.body._id;
        //Let's get cookies
        const cookies = req.cookies;
        //Extract token from the cookie
        const {token} = cookies;
        if(!token){
            throw new Error("Token does not exist");
        }
        // From the token we extract the hidden data using secret key
        const decodedData = jwt.verify(token,"SecretKey");
        console.log(decodedData);     //{ _id: '6851e6905faab86c654ca281', iat: 1750338939 }
        //We got the id associated with the cookie that is present
        const {_id} = decodedData;    //6851e6905faab86c654ca281

        // copy of req.body : never trust req.body
        const data = {...req.body};
        //These are the alloerd fields
        const ALLOWED_UPDATES = ["firstName","lastName","gender","age","photoUrl","skills","about"];
        // Removing id from data i.e req.body
        delete data._id;
        //["firstName","lastName","photoUrl","about","age","skills","gender"] is coming from req.body after removing id
        const isAllowed = Object.keys(data).every(key => ALLOWED_UPDATES.includes(key));
        if(!isAllowed){
            throw new Error("You are passing some extra field")
        }
        //Check whether user is authorised or not
        if(_id !== userId){
            throw new Error("Unauthorised Access!!!");
        }

        const user = await User.findByIdAndUpdate(userId,data);
        // console.log(user);
        res.json({"message":"Profile updated successfully",
            "data": user
        });
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

module.exports = profileRouter;


// I need to update the user details like firstName,lastName,age,gender,photoUrl,about,skills but i will be sending id as
//  well and that should not be updated.

// {
//     "_id": "6851e6905faab86c654ca281",
//     "firstName": "Test",
//     "lastName": "testing",
//      "age":20,
//      "gender":"male"
//     "photoUrl": "https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg",
//     "about": "Hello world",
//      "skills":['javascript','react']
// }
