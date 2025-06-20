const express = require('express');
const jwt = require('jsonwebtoken');
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user")

const requestRouter = express.Router();

// accepted or rejected
requestRouter.post("/request/send/:status/:toUserId",async (req,res) => {
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Token does not exist");
        }

        const decodedData = jwt.verify(token,"SecretKey");
        const {_id} = decodedData;
        const fromUserId = _id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const fromUser = await User.findById(fromUserId);
        if(!fromUser){
            throw new Error("Sender not found !!!");
        }
        const toUser = await User.findById(toUserId);
        if(!toUser){
            throw new Error("Receiver not found !!!");
        }

        if(fromUserId === toUserId){
            throw new Error("Khud ko ku bhej rha hai");
        }

        //Checking the status in params
        const ALLOWED_STATUS = ["interested","ignore"];
        const isAllowed = ALLOWED_STATUS.includes(status);
        if(!isAllowed){
            throw new Error("Invalid status type "+status);
        }


        // Check if there is an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        });
        if(existingConnectionRequest){
            throw new Error("Cannot perform this")
        }



        //create the connection request instance
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        

        //Saving instance to DB
        const data = await connectionRequest.save();
        res.json({
            "message":`${fromUser.firstName} sent a connetion request to ${toUser.firstName}`,
            data,
        });
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

module.exports = requestRouter;