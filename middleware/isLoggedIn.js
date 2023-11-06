const jwt=require('jsonwebtoken')
const isLoggedIn=(req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
        req.isLoggedIn=false;
        next();
    }

    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            req.isLoggedIn=false;
            next();
        }
    });
    req.isLoggedIn=true;
    next();
}

module.exports=isLoggedIn;