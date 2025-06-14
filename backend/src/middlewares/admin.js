

const adminAuth = (req,res,next) => {
    const token = "abc";
    const isAdminAuthorized = token === "abcdf";
    if(isAdminAuthorized){
        next();
    } 
    else{
        res.status(401).send("Unauthorised access request was made");
    }
}

module.exports = {
    adminAuth
};