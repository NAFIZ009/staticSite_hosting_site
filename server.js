const express = require('express');
const dotenv=require('dotenv').config();
const cookieParser = require('cookie-parser');
const port = 3000;
const tokenAuth = require('./middleware/privateRouteVerification/tokenAuth');
//app config
const app = express();

//view engine configuration
app.set('view engine',"ejs");
//cookie config
app.use(cookieParser());

//entry point
app.get('/',(req,res)=>{
    res.render('Home',{page:'home'});
});

//for /upload files
app.use('/upload',tokenAuth,require('./routes/uploadRoutes'));
//for registration 
app.use('/reg',require('./routes/regRoutes'));
//for login 
app.use('/login',require('./routes/logInRoutes'));
//for images
app.use('/img',express.static('public'))

//static file access
app.use('/site/:siteID',(req,res,next)=>{
    const siteID = req.params.siteID;
    req.url=`/${siteID}${req.url}`;
    next();
},express.static('uploads'));

//listing config
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
