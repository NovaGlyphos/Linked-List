const mongoose = require('mongoose');

// Making the schema
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",    // reference to the user collection
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

// index
connectionRequestSchema.index({fromUserId:1,toUserId:1});

// This runs before saving in the DB
// pre schema method for ensuring that sender and receiver are not same at the end
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Pagal hai kya....");
    }
    next();
})

// Model
const ConnectionRequestModel = mongoose.model("ConnectionRequest",connectionRequestSchema);

//Exporting the model
module.exports = ConnectionRequestModel;

