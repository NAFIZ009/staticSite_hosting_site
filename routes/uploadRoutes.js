const express = require('express')
const fileUpload = require('express-fileupload');
const inputValidation = require('../middleware/validation-middleware/inputValidation');
const directoryGenerator = require('../middleware/directoryGenerator');
const uploadControllers=require('../controllers/uploadControllers');
const tokenAuth = require('../middleware/privateRouteVerification/tokenAuth');
const isLoggedIn = require('../middleware/isLoggedIn');

//route configuration
const uploadRoute= express();

//view engine configuration
uploadRoute.set('view engine',"ejs");

uploadRoute.use(express.urlencoded({ extended:true}));
uploadRoute.use(express.json());


//file upload configuration
uploadRoute.use(fileUpload());


//entry pont for directory upload
uploadRoute.get('/',tokenAuth,isLoggedIn,(req,res)=>{
    const isLoggedIn=req.isLoggedIn;
    res.render('Home',{page:'upload',isLoggedIn});
});
//zip file will be send by users and the api will unzip it and store in local storage 
uploadRoute.post('/',inputValidation,directoryGenerator,uploadControllers.uploadFile);
//entry point for single upload
uploadRoute.get('/single',tokenAuth,isLoggedIn,(req,res)=>{
    const isLoggedIn=req.isLoggedIn;
    res.render('Home',{page:'singleUpload',isLoggedIn,status:'false',siteURL:''});
});

uploadRoute.post('/single',inputValidation,directoryGenerator,uploadControllers.uploadFileSingle);
// 


//exporting route
module.exports=uploadRoute;