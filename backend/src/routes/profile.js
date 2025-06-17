const express = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const profileRouter = express.Router();

profileRouter.get("/profile",async (req,res)=>{
    try{
        //Get the cookie
        const cookies = req.cookies;
        //Extract the token from cookie
        const {token} = cookies;
        console.log(token)
        if(!token){
            throw new Error("Token does not exist");
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

module.exports = profileRouter;