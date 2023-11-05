const express = require('express');
const fileUpload = require('express-fileupload');
const logInControllers = require('../controllers/logInControllers');

const logInRoute=express();

//view engine configuration
logInRoute.set('view engine',"ejs");

logInRoute.use(express.urlencoded({ extended: true}));

logInRoute.use(fileUpload());

logInRoute.get('/',(req, res) => {
    res.render('login',{});
});


logInRoute.post('/',logInControllers.logInUser);

module.exports=logInRoute;