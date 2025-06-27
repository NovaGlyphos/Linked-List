const express = require('express');
const {userAuth} = require('../middlewares/auth');
const userRouter = express.Router();
const  ConnectionRequest = require('../models/connectionRequest');
const User = require("../models/user")
const { connection } = require('mongoose');

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

//Brings the data of other users to the feed
userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
        // User should see other user cards except:
        // 0.Their own card
        // 1.Card of the connections (accepted)
        // 2.Card of ignored user
        // 3.Already sent the connection request
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;        // The page number
        const limit = parseInt(req.query.limit) || 10;     // How many documents we want
        const skip = (page-1)*limit;
        //Find all the connection requests(sent+received)
        const connectionRequest = await ConnectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
        }).select("fromUserId toUserId");
        
        // These are the users I want to hide from the feed
        // Use set to get unique users
        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((element) => {
            hideUsersFromFeed.add(element.fromUserId.toString());
            hideUsersFromFeed.add(element.toUserId.toString());
        });

        const USER_SAFE_DATA = "firstName lastName photoUrl about skills age gender"

        //Now get the user whose id is not in the hideUserFromFeed set
        const user = await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUsersFromFeed)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        // console.log(user);
        res.send({userData:user});
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

module.exports = userRouter;