const express = require('express');
const fileUpload = require('express-fileupload');
const logInControllers = require('../controllers/logInControllers');
const isLoggedIn = require('../middleware/isLoggedIn');
const { dataImport } = require('../controllers/dashboardControllers');

const logInRoute=express();

//view engine configuration
logInRoute.set('view engine',"ejs");

logInRoute.use(express.urlencoded({ extended: true}));

logInRoute.use(fileUpload());

//login page render
logInRoute.get('/',isLoggedIn,(req, res) => {
    //checking if the user comes from registration form
    const reg=req.query.reg;
    //checks for errors in logged in
    const loggedIn=req.query.loggedIn;
    //check if the user is logged in
    const isLoggedIn=req.isLoggedIn;
    res.render('home',{page:'login',isLoggedIn,reg,loggedIn});
});

//login check
logInRoute.post('/',logInControllers.logInUser,dataImport,(req, res) => {
    res.redirect('/upload?loggedIn=complete');
});

module.exports=logInRoute;