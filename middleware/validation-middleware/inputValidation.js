const inputValidation=(req,res,next)=>{

    if (!req.files || !req.files.upload || !req.files.upload.mimetype==='application/x-zip-compressed' || !req.files.upload.mimetype==='application/zip' || !req.files.upload.mimetype=='text/html') {
        next(new Error('Invalid File Type')); //send to the error middleware
    }
    console.log(req.files.upload.name)
    next();
}

module.exports=inputValidation;