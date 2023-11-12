const fs = require('@cyclic.sh/s3fs')(process.env.CYCLIC_BUCKET_NAME);
const jwt = require('jsonwebtoken');

const directoryGenerator=(req,res,next)=>{
    const {userId}=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
    //create a folder according to the userId
    const siteDirectory = `uploads/${userId}`;
    fs.exists(siteDirectory, (exists) => {
        if (exists) {
            console.log('directory already exists')
            req.siteDirectory = siteDirectory;
            req.siteID = userId;
            next();
        } else {
            fs.mkdirSync(siteDirectory);
            req.siteDirectory = siteDirectory;
            req.siteID = userId;
            next();
        }
      });
}

module.exports = directoryGenerator;