let isLoggedIn = false;

const loggedOut = (req,res,next)=>{
    isLoggedIn=false;
    next();
};
const loggedIn = (req,res,next)=>{
    isLoggedIn=true;
    next();
};

module.exports={isLoggedIn,loggedOut,loggedIn};