const express = require('express');
const fileUpload = require('express-fileupload');
const regControllers = require('../controllers/regControllers');
const regRoute=express();

regRoute.use(express.urlencoded({ extended: true}));

regRoute.use(fileUpload());

regRoute.get('/',(req, res) => {
    
});


regRoute.post('/create',regControllers.createUser);

module.exports=regRoute;