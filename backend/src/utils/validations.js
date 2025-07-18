// Function to validate the data coming from the API
const validator = require('validator');

const validateSignUpData = (req) => {
    //Extracts the required details to be validated from req.body
    const { firstName,lastName,emailId,password } = req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email ID is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not valid");
    }
}

module.exports = {
    validateSignUpData
}