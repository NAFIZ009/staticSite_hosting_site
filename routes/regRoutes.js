const express = require('express');
const fileUpload = require('express-fileupload');
const regControllers = require('../controllers/regControllers');
const isLoggedIn = require('../middleware/isLoggedIn');
const regRoute=express();

regRoute.use(express.urlencoded({ extended: true}));

regRoute.use(fileUpload());

regRoute.get('/',isLoggedIn,(req, res) => {
    const isLoggedIn=req.isLoggedIn;
    res.render('Home',{page:'reg',isLoggedIn})
});


regRoute.post('/',regControllers.createUser);

module.exports=regRoute;