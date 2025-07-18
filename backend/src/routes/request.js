const express = require('express');
const jwt = require('jsonwebtoken');
const ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user")
const {userAuth} = require('../middlewares/auth')

const requestRouter = express.Router();

// interested and ignore - Sender Side
requestRouter.post("/request/send/:status/:toUserId",userAuth,async (req,res) => {
    try{
        const loggedInUser = req.user;
        // const cookies = req.cookies;
        // console.log(cookies);
        // const {token} = cookies;
        // console.log(token);
        // if(!token){
        //     throw new Error("Token does not exist");
        // }

        // const decodedData = jwt.verify(token,"SecretKey");
        // const {_id} = decodedData;
        const {_id} = loggedInUser;
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
            throw new Error("Hello");
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
        res.status(400).send("This is error: "+err.message);
    }
});

//review API: accepted or rejected - Receiver Side
requestRouter.post('/request/review/:status/:requestId',userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;  //Logged in user coming from auth middleware => cookie
        console.log(loggedInUser);
        // console.log(loggedInUser.id);

        // Extracting results from params
        const status = req.params.status;
        const requestId = req.params.requestId;
        

        const ALLOWED_STATUS = ["accepted","rejected"];
        const isAllowed = ALLOWED_STATUS.includes(status);
        if(!isAllowed){
            throw new Error("Invalid status field");
        }

        // status = "accepted" / "rejected"
        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            status:"interested",
            toUserId:loggedInUser._id
        });
        // console.log(connectionRequest);
        if(!connectionRequest){
            throw new Error("No connection found");
        }
        // Ok so found the connection request,I need to chnage the status of that particular user to the status
        // that is coming from params
        connectionRequest.status = status;

        //Save the changes in the DB
        const data = await connectionRequest.save()
        res.json({
            message:`${loggedInUser.firstName} has ${status} the connection request`,
            data,
        });
    }
    catch(err){
        res.status(400).send("ERROR "+err.message);
    }
});

module.exports = requestRouter;