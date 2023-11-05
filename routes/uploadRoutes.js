const express = require('express')
const fileUpload = require('express-fileupload');
const inputValidation = require('../middleware/validation-middleware/inputValidation');
const directoryGenerator = require('../middleware/directoryGenerator');
const uploadControllers=require('../controllers/uploadControllers');
const tokenAuth = require('../middleware/privateRouteVerification/tokenAuth');


//route configuration
const uploadRoute= express();

//view engine configuration
uploadRoute.set('view engine',"ejs");

uploadRoute.use(express.urlencoded({ extended:true}));
uploadRoute.use(express.json());


//file upload configuration
uploadRoute.use(fileUpload());


//entry pont for /upload
uploadRoute.get('/',tokenAuth,(req,res)=>{
    res.render('Home',{page:'upload'});
});

//zip file will be send by users and the api will unzip it and store in local storage 
uploadRoute.post('/',inputValidation,directoryGenerator,uploadControllers.uploadFile);



//exporting route
module.exports=uploadRoute;