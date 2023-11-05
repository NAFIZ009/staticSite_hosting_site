const AdmZip = require('adm-zip');

exports.uploadFile=(req,res)=>{
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

    // res.send('Files uploaded successfully!URL: ' + siteURL);
    res.render('Home',{page:'home'});
}