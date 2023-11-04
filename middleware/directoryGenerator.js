const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const directoryGenerator=(req,res,next)=>{
    //create a unique folder
    const siteID = uuidv4();
    const siteDirectory = `uploads/${siteID}`;
    fs.mkdirSync(siteDirectory);
    req.siteDirectory = siteDirectory;
    req.siteID = siteID;
    next();
}

module.exports = directoryGenerator;