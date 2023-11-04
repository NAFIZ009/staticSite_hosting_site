const express = require('express')
const fileUpload = require('express-fileupload');
const inputValidation = require('../middleware/validation-middleware/inputValidation');
const directoryGenerator = require('../middleware/directoryGenerator');
const uploadControllers=require('../controllers/uploadControllers');


//route configuration
const route= express();
//file upload configuration
route.use(fileUpload());


//entry pont for /upload
//zip file will be send by users and the api will unzip it and store in local storage 
route.post('/',inputValidation,directoryGenerator,uploadControllers.uploadFile);

//exporting route
module.exports=route;