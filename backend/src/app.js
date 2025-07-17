const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
// Instance of application
const app = express();

//Import User model so that we can create instance of User model
const User = require("./models/user");

// middlwares
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "http://localhost:5173", //whiteListing the domain
    credentials: true, //This allows cookies, authorization headers, or TLS client certificates to be sent with the request.
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json()); // convert json of request to js object
app.use(cookieParser()); // Used for parsing through cookies

// Managing the routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//Connecting to DB and listening to the application
connectDB()
  .then(() => {
    console.log("Database connection established......");
    const PORT = process.env.PORT;
    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
