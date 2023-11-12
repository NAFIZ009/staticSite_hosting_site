const AdmZip = require('adm-zip');
const SiteURL = require('../models/SiteURL');
const jwt = require('jsonwebtoken');
const fs = require('@cyclic.sh/s3fs')(process.env.CYCLIC_BUCKET_NAME);
const path = require('path');
const isLoggedIn = require('../middleware/isLoggedIn');

//upload directory
exports.uploadFile=async(req,res,next)=>{
    //getting zip file
    const uploadedFiles = req.files.upload;
    
    //unzipping the folder and placed it
    const zip=new AdmZip(uploadedFiles.data);
    // zip.extractAllTo(req.siteDirectory,'true');
    zip.extractAllTo('/tmp','true');
    
    //getting zip file original name
    let zipFolderName = '';
    const entries = zip.getEntries();
    // Get the folder name by examining the first entry path
    if (entries.length > 0) {
        const firstEntry = entries[0];
        const entryNameParts = firstEntry.entryName.split('/');
        if (entryNameParts.length > 1) {
            zipFolderName = entryNameParts[0];
        }
    }
    
    //url for the uploaded files
    const siteURL = `${req.protocol}://${req.get('host')}/site/${req.siteID}/${zipFolderName}`;


    // res.send('Files uploaded successfully!URL: ' + siteURL);
    const token = req.cookies.token;
    jwt.verify(token,process.env.SECRET_KEY,async (err, decoded) => {
        if(err)
        {
            next(new Error('token_expired'));
        }
        // console.log({userId:decoded.userId,url:siteURL});
        

        const data={userId:decoded.userId,url:siteURL};
        SiteURL.create({userId:decoded.userId,url:siteURL}).then(result =>{
            res.send({
                status:'success',
                siteURL
            });
        }).catch(err =>{
            console.log(err);
            res.send({
                status:'error',
                siteURL:'/'
            });
        })
    });
}

//upload single file
exports.uploadFileSingle=async(req,res,next)=>{
    //getting file
    const uploadedFiles = req.files.upload;
    const directoryName=req.body.directory;
    
    const fileDir =`${req.siteDirectory}/${directoryName}`;
    fs.mkdirSync(fileDir);
    fs.writeFile(path.join(fileDir,'index.html'), uploadedFiles.data, (err) => {
        if (err) {
          next(new Error('server_error'));
        }
        //url for the uploaded files
        const url = `${req.protocol}://${req.get('host')}/site/${req.siteID}/${directoryName}`;

        const token = req.cookies.token;
        jwt.verify(token,process.env.SECRET_KEY,async (err, decoded) => {
            if(err)
            {
                next(new Error('token_expired'));
            }
            const {userId} = decoded;
            const site=await SiteURL.create({userId,url});
            res.render('Home',{page:'singleUpload',isLoggedIn,status:true,
            siteURL:url});
        });
    });
}

