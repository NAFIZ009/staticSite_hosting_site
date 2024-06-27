// const fs = require('@cyclic.sh/s3fs')(process.env.CYCLIC_BUCKET_NAME);
const jwt = require('jsonwebtoken');

// hosty.deploy/302e9af3-0207-4321-8f4b-016e1d62984b/bestfive

const directoryGenerator=(req,res,next)=>{
    const {userId}=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
    const folderName=req.body.directory||req.files.upload.name;
    //creating root path for project directory
    const siteDirectory = `hosty.deploy/${userId}.${folderName.replace(/\s+/g, '')}/${folderName.replace(/\s+/g, '')}`;
    req.siteDirectory = siteDirectory;
    req.siteID = userId;
    req.folderName = folderName;
    console.log(siteDirectory)
    next();
}


module.exports = directoryGenerator;