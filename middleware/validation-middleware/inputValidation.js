const inputValidation=(req,res,next)=>{
    if (!req.files || !req.files.upload || !req.files.upload.mimetype==='application/x-zip-compressed') {
        next(new Error('')); //send to the error middleware
    }
    next();
}

module.exports=inputValidation;