const express = require('express');
const fileUpload = require('express-fileupload');
const logInControllers = require('../controllers/logInControllers');
const isLoggedIn = require('../middleware/isLoggedIn');

const logInRoute=express();

//view engine configuration
logInRoute.set('view engine',"ejs");

logInRoute.use(express.urlencoded({ extended: true}));

logInRoute.use(fileUpload());

logInRoute.get('/',isLoggedIn,(req, res) => {
    const isLoggedIn=req.isLoggedIn;
    res.render('home',{page:'login',isLoggedIn});
});


logInRoute.post('/',logInControllers.logInUser,(req, res) => {
    res.redirect('/upload');
});

module.exports=logInRoute;