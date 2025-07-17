
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRET

//What is the purpose of this middleware

const userAuth = async (req,res,next) => {
    try{
        //Reading the cookie
        const cookies = req.cookies;     //{token:"abcbbcbcbbcbbcb"}
        //Taking out the token
        const {token} = cookies;
        if(!token){
            throw new Error("Token is not valid!!!!😭");
        }
        //Decoding the hidden message
        const decodedData = jwt.verify(token,key)     // {_id:user._id}
        const {_id} = decodedData;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }

        //Attached user object with req
        req.user = user;  //Attaching user obj with req obj
        next();
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
}

module.exports = {
    userAuth
}