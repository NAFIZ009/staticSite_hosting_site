const express = require('express')
const fileUpload = require('express-fileupload');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

//route configuration
const route= express();

route.use(fileUpload());

route.post('/',(req,res)=>{
    if (!req.files || !req.files.upload) {
        return res.status(400).send('No files were uploaded.');
      }

      const uploadedFiles = req.files.upload;
    
      const siteID = uuidv4();
      const siteDirectory = `uploads/${siteID}`;
      fs.mkdirSync(siteDirectory);
    
      // Move the files to a specific directory
      if (Array.isArray(uploadedFiles)) {
        uploadedFiles.forEach(file => {
          if(file.mimetype!='application/octet-stream') 
          {
            file.mv(path.join(__dirname,'../', siteDirectory, file.name), err => {
              if (err) {
                return res.status(500).send(err);
              }
            });
          }
        });
      } else {
        console.log(uploadedFiles)
        uploadedFiles.mv(path.join(__dirname,'../', siteDirectory, uploadedFiles.name), err => {
          if (err) {
            console.log(err);
            return res.status(500).send(err);
          }
        });
      }
      //url for the uploaded files
      const siteURL = `${req.protocol}://${req.get('host')}/site/${siteID}`;

      res.send('Files uploaded successfully!URL: ' + siteURL);
});

//exporting route
module.exports=route;