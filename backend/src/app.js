const express = require('express');
const app = express(); 
const {connectDB} = require("./config/database");
const {validateSignUpData} = require('./utils/validations');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//Imported Middlewares
const {userAuth} = require('./middlewares/auth')

//Import User model so that we can create instance of User model
const User = require("./models/user");

//middlwares
app.use(express.json());    // convert json of request to js object
app.use(cookieParser());

//create an API to insert data in the database
app.post("/signup",async (req,res)=>{
    try{
        //Validate the data coming from req.body
        validateSignUpData(req);
        
        //Encrypt the password
        const {firstName,lastName,emailId,password} = req.body;
        const hashedPass = await bcrypt.hash(password,10);
        console.log(hashedPass);

        // We now create instance of user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:hashedPass,
        });

        await user.save();
        res.send("User data saved successfully");
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }

});

//Login API

app.post("/login",async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        
        // First of all we are checking that email ID exist or not
        const user = await User.findOne({emailId:emailId});
        // console.log(user);

        // If email ID not found
        if(!user){
            throw new Error("Invalid credentials");
        }

        //Now we will check whether password is valid or not
        const isPasswordValid = await bcrypt.compare(password,user.password);

        //Password is valid
        if(isPasswordValid){
            //Create a token wrt to id of user
            const token = jwt.sign({exp:Math.floor(Date.now()/1000)+10,_id:user._id},"SecretKey@123");   //{_id:user._id} this is secret data
            // console.log(token);

            res.cookie("token",token);  // Sent back the cookie with response
            res.send("Login successfull");
        }
        else{
            res.send("Password is not valid");
        }
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});

// Profile API
app.get("/profile",userAuth ,async (req,res)=>{
    try{
        const user = req.user;   //This is coming from the middlware userAuth
        console.log(user)
        res.send("This is user profile");
    }
    catch(err){
        res.status(401).send("Unauthorized Access "+err.message);
    }
})

//Send connection Request
app.post("/sendConnectionRequest",userAuth,async (req,res)=>{
    try{
        const user = req.user;   // extracting user from req object
        const {firstName,lastName} = user;
        res.send(`${firstName} ${lastName} sent you a connection request`);
    }
    catch(err){
        res.status(400).send("Something went wrong: "+err.message);
    }
})


//Get user by email
app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;  //The email that we will send via request
    try{
        const user = await User.find({emailId:userEmail});     //This method will find the em ailId 
        if(user.length === 0){
            res.status(400).send("kaha gya usse dhundooo");
        }
        else{
            res.send(user);
        }   
    }
    catch(err){
        res.status(400).send("Something went wrong "+err.message);
    }
})

//Get data of all the users
app.get("/feed",async (req,res)=>{
    try{
        const users = await User.find({});   //Here we pass empty filter to get data of all the users
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong "+err.message);
    }
});


//Delete data by user Id
app.delete("/userDelete",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            res.send("No user found to be deleted !!");
        }
        else{
            res.send("User deleted successfully");
        }
    }
    catch(err){
        res.status(400).send("Something went wrong "+err.message);
    }
})


// Update the user by ID
app.patch("/user/:userId",async (req,res)=>{

    const userId = req.params.userId;
    const data = req.body;

    const ALLOWED_UPDATES = ["firstName","lastName","age","gender","photoUrl","about","skills"];
    const isAllowed = Object.keys(data).every(key => ALLOWED_UPDATES.includes(key));
    if(!isAllowed){
        res.status(400).send("Update not allowed for this field");
    }

    try{
        const updated = await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"before"});
        console.log(updated);
        if(!updated){
            res.status(404).send("Cannot find user to update!!");
        }
        else{
            res.send("User updated successfully!!");
        }
    }
    catch(err){
        res.status(400).send("Something went wrong "+err.message);
    }
});

//Update user by email ID
app.patch("/userEmail",async (req,res)=>{
    const email = req.body.emailId;

    const data = {...req.body};  //clone the body to avoid mutation 

    const ALLOWED_UPDATES = ["firstName","lastName","age","gender","photoUrl","about","skills"];

    // Remove emailId from the data to update
    delete data.emailId;

    // Check if every key in `data` is allowed to be updated
    const isAllowed = Object.keys(data).every(key => ALLOWED_UPDATES.includes(key));
    if(!isAllowed){
        res.status(400).send("Updating this field is not allowed");
    }
    try{
        const updated = await User.findOneAndUpdate({emailId:email},data,{runValidators:true});
        if(!updated){
            res.status(404).send("Cannot find the email ID");
        }
        else{
            res.send("User updated successfully!!!")
        }
    }
    catch(err){
        res.status(400).send("Something went wrong "+err.message);
    }
});



//Connecting to DB and listening to the application
connectDB()
    .then(()=>{
        console.log("Database connection established......");
        app.listen(3000,()=>{
            console.log('server is running at port 3000');
        });
    })
    .catch((err)=>{
        console.errpr("Database cannot be connected");
    });




