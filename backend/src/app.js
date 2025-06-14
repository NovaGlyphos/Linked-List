const express = require('express');
const app = express(); 
const {connectDB} = require("./config/database")
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

app.use("/admin",adminAuth);

app.get("/admin/getAllDetails",(req,res)=>{
    res.send("All data sent");
});

app.delete("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a user");
});



