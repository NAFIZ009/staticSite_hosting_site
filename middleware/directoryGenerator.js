const fs = require('fs');
const jwt = require('jsonwebtoken');

const directoryGenerator=(req,res,next)=>{
    console.log(req.cookies.token);
    const {userId}=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
    //create a folder according to the userId
    const siteDirectory = `uploads/${userId}`;
    fs.mkdirSync(siteDirectory);
    req.siteDirectory = siteDirectory;
    req.siteID = userId;
    next();
}

module.exports = directoryGenerator;