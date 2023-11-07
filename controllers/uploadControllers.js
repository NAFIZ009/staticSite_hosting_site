const AdmZip = require('adm-zip');
const SiteURL = require('../models/SiteURL');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const isLoggedIn = require('../middleware/isLoggedIn');

exports.uploadFile=async(req,res)=>{
    //getting zip file
    const uploadedFiles = req.files.upload;
    
        
    //unzipping the folder and placed it
    const zip=new AdmZip(uploadedFiles.data);
    zip.extractAllTo(req.siteDirectory,'true');
    
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

    console.log('Uploading')
    // res.send('Files uploaded successfully!URL: ' + siteURL);
    const token = req.cookies.token;
    jwt.verify(token,process.env.SECRET_KEY,async (err, decoded) => {
        const site=await SiteURL.create({userId:decoded.userId,url:siteURL})
        res.send({
            status:'success',
            siteURL
        });
    });
}

exports.uploadFileSingle=async(req,res)=>{
    //getting file
    const uploadedFiles = req.files.upload;
    const directoryName=req.body.directory;
    
    const fileDir =`${req.siteDirectory}/${directoryName}`;
    fs.mkdirSync(fileDir);
    fs.writeFile(path.join(fileDir,'index.html'), uploadedFiles.data, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        //url for the uploaded files
        const siteURL = `${req.protocol}://${req.get('host')}/site/${req.siteID}/${directoryName}`;

        const token = req.cookies.token;
        jwt.verify(token,process.env.SECRET_KEY,async (err, decoded) => {
            const site=await SiteURL.create({userId:decoded.userId,url:siteURL});
            res.render('Home',{page:'singleUpload',isLoggedIn,status:'',
            siteURL});
            // res.send({
            //     status:'success',
            //     siteURL
            // });
        });
    });
    
    
}