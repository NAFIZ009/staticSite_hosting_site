const fs = require('fs');
const jwt = require('jsonwebtoken');

const directoryGenerator=(req,res,next)=>{
    const {userId}=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
    //create a folder according to the userId
    const siteDirectory = `uploads/${userId}`;
    fs.access(siteDirectory, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(siteDirectory);
            req.siteDirectory = siteDirectory;
            req.siteID = userId;
            next();
        } else {
            console.log('directory already exists')
            req.siteDirectory = siteDirectory;
            req.siteID = userId;
            next();
        }
      });
}

module.exports = directoryGenerator;