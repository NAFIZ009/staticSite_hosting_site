const jwt=require('jsonwebtoken');

const isLoggedIn=(req,res,next)=>{
    const token = req.cookies.token;
    
    //if token is not available
    if (!token) {
        req.isLoggedIn=false;
        next();
    }
    //verify token
    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            req.isLoggedIn=false;
            next();
        }else
        {
            req.userId=decoded.userId;
        }
    });
    //declare state
    req.isLoggedIn=true;
    next();
}

module.exports=isLoggedIn;