const jwt = require("jsonwebtoken");
const SiteURL = require("../models/SiteURL");
const path = require("path");
const s3 = require("../config/firebase");

exports.dataImport = (req, res, next) => {
  const token = req.cookies.token;
  const { userId } = jwt.verify(token, process.env.SECRET_KEY);
  //state for empty project
  let empty = false;
  //getting project information
  SiteURL.findAll({ raw: true, where: { userId } })
    .then((resp) => {
      if (resp.length == 0) empty = true;

      resp.forEach((data) => {
        //add file name
        const filename = path.basename(data.url);
        data.fileName = filename;
        //add created date
        const createdDateTimeString = data.createdAt;
        const updateDateTimeString = data.updatedAt;
        const cDate = new Date(createdDateTimeString);
        const uDate = new Date(updateDateTimeString);

        const cDay = String(cDate.getUTCDate()).padStart(2, "0");
        const cMonth = String(cDate.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based, hence the +1
        const cYear = cDate.getUTCFullYear();
        const uDay = String(uDate.getUTCDate()).padStart(2, "0");
        const uMonth = String(uDate.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based, hence the +1
        const uYear = uDate.getUTCFullYear();

        const createdFormattedDate = `${cDay}-${cMonth}-${cYear}`;
        const updatedFormattedDate = `${uDay}-${uMonth}-${uYear}`;
        data.createdFormattedDate = createdFormattedDate;
        data.updatedFormattedDate = updatedFormattedDate;
      });

      const isLoggedIn = req.isLoggedIn;

      if (!empty) {
        req.DashboardData = resp;
      }
      // next();
      res.render("Home", { page: "dashboard", data: resp, isLoggedIn, empty });
    })
    .catch((err) => {
      console.log(err);
      res.send("Error Occurred");
    });
};

exports.deleteProject = async (req, res, next) => {
  const { id, url } = req.query;

  //delete project
  const deleteParams = {
    Bucket: process.env.CYCLIC_BUCKET_NAME,
    Key: url,
  };

  s3.deleteObject(deleteParams, (errs, DeleteData) => {
    if (errs) {
      console.error("Error deleting object from S3:", errs);
      res.status(400).send("error");
    } else {
      SiteURL.destroy({ where: { id } })
        .then((deletedRows) => {
          if (deletedRows > 0) {
            console.log("deleted");
            res.status(204).send("success");
          } else {
            console.error(err);
            res.status(400).send("error");
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(400).send("error");
        });
    }
  });

  // console.log(id, fileName, userId);
  // console.log(`uploads/${userId}/${fileName}`);
  // const dirPath=path.join('uploads', userId, fileName);

  // // const state=logFileContents(`uploads/${userId}/${fileName}`)
  // const state=logFileContents('uploads/302e9af3-0207-4321-8f4b-016e1d62984b/best-five-dom')

  // if(state)
  // {
  //     SiteURL.destroy({where:{
  //         id
  //     }})
  //     .then(deletedRows=>{
  //         if (deletedRows > 0){
  //             console.log("deleted");
  //             res.status(204).send("success");
  //         }else
  //         {
  //             console.error(err);
  //             res.status(400).send("error");
  //         }
  //     }).catch(err=>{
  //         console.error(err);
  //         res.status(400).send("error");
  //     })
  // }
  // // .then(re=>{

  // // }).catch(err=>{
  // //     console.error(err);
  // //     res.status(400).send("error");
  // // });

  // function logFileContents(directoryPath) {
  //     console.log(directoryPath);
  //     // Read the contents of the directory
  //     fsP.readdir(directoryPath)
  //     .then(files=>{
  //         files.forEach((file) => {
  //             const filePath = path.join(directoryPath, file);

  //             // Check if it's a directory
  //             if (fs.statSync(filePath).isDirectory()) {
  //                 // Recursively log contents of subdirectories
  //                logFileContents(filePath);
  //             } else {
  //                 // Log contents of files
  //                 fs.rmSync(filePath);
  //             }
  //         });
  //     })
  //     .then(()=>{
  //         fs.exists(`uploads/${userId}/${fileName}`,(ex)=>{
  //             if(ex){
  //                 return true;
  //             }else{
  //                 return false;
  //             }
  //         })
  //     })
  // }
};
