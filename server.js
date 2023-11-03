const express = require('express')
const port = 3047;

//app config
const app = express();

//view engine configuration
app.set('view engine',"ejs");

//entry point
app.get('/',(req,res)=>{
    res.render('first',{});
});

//for /upload files
app.use('/upload',require('./routes/upload'));

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
