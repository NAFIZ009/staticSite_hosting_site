const express = require('express');
const tokenAuth = require('../middleware/privateRouteVerification/tokenAuth');
const { dataImport } = require('../controllers/dashboardControllers');
const isLoggedIn = require('../middleware/isLoggedIn');
const { deleteProject } = require('../controllers/dashboardControllers');

//route configuration
const dashboardRoute= express();

//view engine configuration
dashboardRoute.set('view engine',"ejs");


//entry pont for /dashboard
dashboardRoute.get('/',tokenAuth,isLoggedIn,dataImport);

//delete project
dashboardRoute.delete('/:id/:fileName',tokenAuth,isLoggedIn,deleteProject);


//exporting route
module.exports=dashboardRoute;