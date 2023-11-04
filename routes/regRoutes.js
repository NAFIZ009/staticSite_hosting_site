const express = require('express');
const regControllers = require('../controllers/regControllers');
const regRoute=express();

regRoute.use(express.urlencoded({ extended: true}));

regRoute.get('/',(req, res) => {
    
});


regRoute.post('/create',(req,res)=>{
    console.log(req.username);
},regControllers.createUser);

module.exports=regRoute;