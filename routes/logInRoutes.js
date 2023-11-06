const express = require('express');
const fileUpload = require('express-fileupload');
const logInControllers = require('../controllers/logInControllers');
const { isLoggedIn, loggedIn } = require('../utilits/userState');

const logInRoute=express();

//view engine configuration
logInRoute.set('view engine',"ejs");

logInRoute.use(express.urlencoded({ extended: true}));

logInRoute.use(fileUpload());

logInRoute.get('/',(req, res) => {
    res.render('home',{page:'login'});
});


logInRoute.post('/',logInControllers.logInUser,loggedIn,(req, res) => {
    res.redirect('/upload');
});

module.exports=logInRoute;