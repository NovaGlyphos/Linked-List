const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ayush2005:12345@mycluster.sybke7l.mongodb.net/testDB");
};

module.exports = {connectDB}

