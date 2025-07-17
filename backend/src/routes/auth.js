// Importing the things up
const express = require("express");
const { validateSignUpData } = require("../utils/validations");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET

const authRouter = express.Router();

// Sign UP API
authRouter.post("/signup", async (req, res) => {
  try {
    //Validate the req coming from /signup API call
    validateSignUpData(req);

    // Encrypting the password
    const { firstName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    //create the user instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });

    //saving user in Database
    const savedUser = await user.save();
    //Create a token wrt that user and send it via cookie
    const token = await savedUser.getJWT();
    res.cookie("token",token,{
      expires:new Date(Date.now()+8*3600000),
    })
    res.json({message:"User saved successfully !!!!",data:savedUser});
  } catch (err) {
    res.status(400).send("ERROR hjjdjdhjsh: " + err.message);
  }
});

// Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    // First we will check whether email exist or not
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // Check for the password since user exist
    const hashedPass = user.password;
    const isPasswordValid = await bcrypt.compare(password, hashedPass);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    // If password is also correct then we will generate a token
    const token = jwt.sign({ _id: user._id }, key); // A token will be created for that specific user ID
    res.cookie("token", token);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  const cookies = req.cookies;
  res.cookie("token", null, { expires: new Date(Date.now() + 0) }); //cookie expire & token null
  res.send("Log out successfull");
});

module.exports = authRouter;
