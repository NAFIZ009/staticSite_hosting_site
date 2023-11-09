const express = require('express');
const fileUpload = require('express-fileupload');
const regControllers = require('../controllers/regControllers');
const isLoggedIn = require('../middleware/isLoggedIn');
const regRoute=express();

regRoute.use(express.urlencoded({ extended: true}));

regRoute.use(fileUpload());

// register page rendering
regRoute.get('/',isLoggedIn,(req, res) => {
    //if the user is from registration
    const reg=req.query.reg;
    //user login state
    const isLoggedIn=req.isLoggedIn;
    res.render('Home',{page:'reg',isLoggedIn,reg})
});

//create user
regRoute.post('/',regControllers.createUser);

module.exports=regRoute;