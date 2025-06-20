
const mongoose = require('mongoose');

// Making the schema
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:['ignore','interested','accepted','rejected'],
            message:`{VALUE} is incorrect status type`
        },
        required:true
    }
},{timestamps:true});

// Model
const ConnectionRequestModel = mongoose.model("ConnectionRequest",connectionRequestSchema);

//Exporting the model
module.exports = ConnectionRequestModel;

