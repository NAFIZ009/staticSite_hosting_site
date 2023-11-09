const jwt = require("jsonwebtoken");
const SiteURL = require("../models/SiteURL");
const path = require('path');


exports.dataImport=(req,res,next)=>{
    const token = req.cookies.token;
    const {userId}=jwt.verify(token,process.env.SECRET_KEY);
    //state for empty project
    let empty=false;
    //getting project information
    SiteURL.findAll({raw:true,where:{userId}})
    .then(resp=>{
        if(resp.length==0) empty=true;
        resp.forEach(data=>{
            //add file name
            const filename=path.basename(data.url);
            data.fileName=filename;
            //add created date
            const createdDateTimeString =data.createdAt;
            const updateDateTimeString =data.updatedAt;
            const cDate = new Date(createdDateTimeString);
            const uDate = new Date(updateDateTimeString);

            const cDay = String(cDate.getUTCDate()).padStart(2, '0');
            const cMonth = String(cDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, hence the +1
            const cYear = cDate.getUTCFullYear();
            const uDay = String(uDate.getUTCDate()).padStart(2, '0');
            const uMonth = String(uDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based, hence the +1
            const uYear = uDate.getUTCFullYear();

            const createdFormattedDate = `${cDay}-${cMonth}-${cYear}`;
            const updatedFormattedDate = `${uDay}-${uMonth}-${uYear}`;
            data.createdFormattedDate=createdFormattedDate;
            data.updatedFormattedDate=updatedFormattedDate;
        });
        const isLoggedIn=req.isLoggedIn;
        res.render('Home',{page:'dashboard',data:resp,isLoggedIn,empty});
    })
    .catch(err => {
        res.send('Error Occurred');
    });
}