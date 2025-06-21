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
})

module.exports = userRouter;