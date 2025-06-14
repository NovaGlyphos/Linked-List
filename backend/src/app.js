const express = require('express');
const app = express(); 
const {connectDB} = require("./config/database");

//Import User model so that we can create instance of User model
const User = require("./models/user");

//middlware
app.use(express.json());

//create an API to insert data in the database
app.post("/signup",async (req,res)=>{
    const userObj = req.body;
    
    // We now create instance of user model
    const user = new User(userObj);

    try{
        await user.save();
        res.send("User data saved successfully");
    }
    catch(err){
        res.status(400).send("Error saving the user!!"+err.message);
    }

});

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




connectDB()
    .then(()=>{
        console.log("Database connection established......");
        app.listen(3000,()=>{
            console.log('server is running at port 3000');
        });
    })
    .catch((err)=>{
        console.errpr("Database cannot be connected");
    })




