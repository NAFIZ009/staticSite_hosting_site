const jwt = require('jsonwebtoken');

const tokenAuth=(req,res,next)=>{
    const token = req.cookies.token;

    if (!token) {
        res.redirect('/login');
        return;
    }

    jwt.verify(token,process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            res.redirect('/login');
            return;
        }
    });
    next();
}

module.exports=tokenAuth;