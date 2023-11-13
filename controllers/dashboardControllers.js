const jwt = require("jsonwebtoken");
const SiteURL = require("../models/SiteURL");
const path = require('path');
const fs = require('@cyclic.sh/s3fs')(process.env.CYCLIC_BUCKET_NAME);
const { promisify } = require('util');

exports.dataImport=(req,res,next)=>{
    const token = req.cookies.token;
    const {userId}=jwt.verify(token,process.env.SECRET_KEY);
    //state for empty project
    let empty=false;
    //getting project information
    SiteURL.findAll({raw:true,where:{userId}})
    .then(resp=>{
        if(resp.length==0)  empty=true; 

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

        if(!empty)
        {
            req.DashboardData=resp;
        }
        // next();
        res.render('Home',{page:'dashboard',data:resp,isLoggedIn,empty});
    })
    .catch(err => {
        console.log(err);
        res.send('Error Occurred');
    });
}

exports.deleteProject=async(req, res, next) => {
    const id=req.params.id;
    const fileName=req.params.fileName;
    const userId=req.userId;
    
    SiteURL.destroy({where:{
        id
    }}).then(deletedRows=>{
        if (deletedRows > 0) {
            
            // const unlinkAsync = promisify(fs.unlink);
            fs.rm(path.join('uploads',userId,fileName), { recursive: true }, (err) => {
                if (err) {
                  console.error(err);
                  res.status(400).send("error");
                } else {
                    console.log("deleted");
                    res.status(204).send("success");
                }
              });
            
        } else {

        }
    })
};