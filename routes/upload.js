const express = require('express')
const fileUpload = require('express-fileupload');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const AdmZip = require('adm-zip');
//route configuration
const route= express();
//file upload configuration
route.use(fileUpload());

route.post('/',(req,res)=>{
    if (!req.files || !req.files.upload) {
        return res.status(400).send('No files were uploaded.');
    }
    
    const uploadedFiles = req.files.upload;
    //create a unique folder
    const siteID = uuidv4();
    const siteDirectory = `uploads/${siteID}`;
    fs.mkdirSync(siteDirectory);

    let zipFolderName = '';
    //check if zip folder exists
    if(uploadedFiles.mimetype==='application/x-zip-compressed')
    {
        //unzipping the folder and placed it
        const zip=new AdmZip(uploadedFiles.data);
        zip.extractAllTo(siteDirectory,'true');

        const entries = zip.getEntries();

        // Get the folder name by examining the first entry path
        if (entries.length > 0) {
            const firstEntry = entries[0];
            const entryNameParts = firstEntry.entryName.split('/');
            if (entryNameParts.length > 1) {
                zipFolderName = entryNameParts[0];
            }
        }
    }
    
    //url for the uploaded files
    const siteURL = `${req.protocol}://${req.get('host')}/site/${siteID}/${zipFolderName}`;

    res.send('Files uploaded successfully!URL: ' + siteURL);
});

//exporting route
module.exports=route;