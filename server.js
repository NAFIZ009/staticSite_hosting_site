const express = require('express')
const port = 3000;

//app config
const app = express();

//view engine configuration
app.set('view engine',"ejs");

//entry point
app.get('/',(req,res)=>{
    res.render('Home',{});
});

//for /upload files
app.use('/upload',require('./routes/uploadRoutes'));
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
