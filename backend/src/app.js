const express = require('express');
const {connectDB} = require("./config/database");
const cookieParser = require('cookie-parser');

// Instance of application
const app = express(); 

//Imported Middlewares
const {userAuth} = require('./middlewares/auth');

//Import User model so that we can create instance of User model
const User = require("./models/user");

//middlwares
app.use(express.json());    // convert json of request to js object
app.use(cookieParser());    // Used for parsing through cookies

// Managing the routes
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use("/",authRouter);
app.use("/",profileRouter);
app.use('/',requestRouter);

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





