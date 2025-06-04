const express = require('express');
const app = express();


app.get("/user",(req,res)=>{
    console.log("First route handler.....");
    res.send("THIS WAS THE FIRST RH");
})

app.use("/",(req,res)=>{
    console.log("/ route was called")
    res.send("THIS IS THE MAIN / ROUTE");
})

app.listen(3000,()=>{
    console.log('server is running at port 3000');
})