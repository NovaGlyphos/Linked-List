const express = require('express');
const {userAuth} = require('../middlewares/auth');
const userRouter = express.Router();
const  ConnectionRequest = require('../models/connectionRequest')

// API for connection request received by the logged in user which are pending : works when the connection
// is in interested state
userRouter.get('/user/requests/received',userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const {_id} = loggedInUser;
        const connectionRequest = await ConnectionRequest.find({
            //logged in user ID should be equal to toUser ID
            toUserId:_id,
            // status should be interested
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"])
        
        res.json({connectionReceived:connectionRequest});
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
});

// connection API : give information of people who is in connection (accepted status)
//logged in user is in either fromUserID or toUserId in connectionRequest DB
userRouter.get("/user/connection",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;  // Coming from userAuth middleware
        const {_id} = loggedInUser;   // login id of logged in user

        // Logged in as AYUSH
        // Ayush -> Mom  ==> accepted  (fromUserId)
        // Mom -> Ayush ==> accepted    (toUserId)

        const USER_SAFE_DATA = "firstName lastName photoUrl about skills age gender"

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId:_id,status:"accepted"},
                {toUserId:_id,status:'accepted'}
            ]
        }).populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA)

        //I just want data associated with fromUser and toUser
        const data = connectionRequest.map(row => ({
            fromUser:row.fromUserId,
            toUser:row.toUserId,
        }));

        res.json({data:data});
    }
    catch(err){
        res.status(400).json({"message":err.message});
    }
});


module.exports = userRouter;