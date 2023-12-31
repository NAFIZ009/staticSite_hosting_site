const express = require('express');
const dotenv=require('dotenv').config();
const cookieParser = require('cookie-parser');
const port =process.env.PORT || 3000;
const tokenAuth = require('./middleware/privateRouteVerification/tokenAuth');
const isLoggedIn = require('./middleware/isLoggedIn');
//app config
const app = express();

//view engine configuration
app.set('view engine',"ejs");
//cookie config
app.use(cookieParser());

//entry point
app.get('/',isLoggedIn,(req,res)=>{
    const isLoggedIn=req.isLoggedIn;
    res.render('Home',{page:'home',isLoggedIn});
});


app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/login'); 
})

//for /upload files
app.use('/upload',tokenAuth,require('./routes/uploadRoutes'));

//for registration 
app.use('/reg',require('./routes/regRoutes'));

//for login 
app.use('/login',require('./routes/logInRoutes'));

//dashboard
app.use('/dashboard',require('./routes/dashboardRoutes'));

//access hosted site
app.use('/hosty.deploy',require('./routes/siteRoutes'));

//static file access
// app.use('/site/:siteID',(req,res,next)=>{
//     const siteID = req.params.siteID;
//     req.url=`/${siteID}${req.url}`;
//     next();
// },express.static('uploads'));

app.use((err,req, res, next)=>{
    if(err)
    {
        console.log(err);
        res.send("Server error.Please try again");
    }
});


//listing config
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});