const express = require('express');
const dotenv=require('dotenv').config();
const cookieParser = require('cookie-parser');
const port = 3000;
const tokenAuth = require('./middleware/privateRouteVerification/tokenAuth');
const isLoggedIn = require('./middleware/isLoggedIn');
//app config
const app = express();

//view engine configuration
app.set('view engine',"ejs");
//cookie config
app.use(cookieParser());

//entry point
app.get('/',isLoggedIn,(req,res)=>{
    const isLoggedIn=req.isLoggedIn;
    res.render('Home',{page:'home',isLoggedIn});
});

app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect('/login'); 
})

//for /upload files
app.use('/upload',tokenAuth,require('./routes/uploadRoutes'));
//for registration 
app.use('/reg',require('./routes/regRoutes'));
//for login 
app.use('/login',require('./routes/logInRoutes'));
//dashboard
app.use('/dashboard',require('./routes/dashboardRoutes'));
//for images
app.use('/img',express.static('public'))

//static file access
app.use('/site/:siteID',(req,res,next)=>{
    const siteID = req.params.siteID;
    req.url=`/${siteID}${req.url}`;
    next();
},express.static('uploads'));

//listing config
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


// <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
//   <div class="flex lg:flex-1">
//     <a href="/" class="-m-1.5 p-1.5">
//       <span
//         class="py-1 px-2 text-gray-900 border-2 font-semibold text-2xl rounded-lg border-indigo-600"
//         style="
//           font-family: 'Anton', sans-serif;
//           font-family: 'Roboto Slab', serif;
//         "
//         >Hosty.</span
//       >
//     </a>
//   </div>
//   <div class="lg:flex lg:flex-1 lg:justify-end gap-4 ">
//     <% if(isLoggedIn) {%>
//       <a href="/upload" class="text-lg font-bold leading-6 text-indigo-600"
//         >Deploy </a
//         >
//       <a href="/dashboard" class="text-md font-semibold  leading-6 text-gray-900"
//         >Dashboard </a
//         >
//         <a href="/logout" class="text-sm font-semibold leading-6 text-gray-900"
//         >Log Out <span aria-hidden="true">&rarr;</span></a
//         >
//       <% } else{%>
//         <% if(page=='reg'|| page=='home') {%>
//           <a href="/login" class="text-sm font-semibold leading-6 text-gray-900"
//         >Log in <span aria-hidden="true">&rarr;</span></a
//         >
//         <% } else if(page=='login') {%>
//             <a href="/reg" class="text-sm font-semibold leading-6 text-gray-900"
//           >Join Us <span aria-hidden="true">&rarr;</span></a
//         >
//         <% } %>
//       <% } %>
//   </div>
// </nav>



      
      
