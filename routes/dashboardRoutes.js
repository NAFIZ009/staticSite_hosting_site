const express = require('express');
const tokenAuth = require('../middleware/privateRouteVerification/tokenAuth');
const { dataImport } = require('../controllers/dashboardControllers');
const isLoggedIn = require('../middleware/isLoggedIn');

//route configuration
const dashboardRoute= express();

//view engine configuration
dashboardRoute.set('view engine',"ejs");


//entry pont for /dashboard
dashboardRoute.get('/',tokenAuth,isLoggedIn,dataImport);


//exporting route
module.exports=dashboardRoute;