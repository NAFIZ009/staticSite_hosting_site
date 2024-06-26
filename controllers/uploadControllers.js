const AdmZip = require("adm-zip");
const SiteURL = require("../models/SiteURL");
// const mime = require('mime');
const jwt = require("jsonwebtoken");
const fs = require("@cyclic.sh/s3fs")(process.env.CYCLIC_BUCKET_NAME);
const fsP = require("@cyclic.sh/s3fs/promises")(process.env.CYCLIC_BUCKET_NAME);
const path = require("path");
const isLoggedIn = require("../middleware/isLoggedIn");
const storage = require("../models/Storage");
const JSZip = require("jszip");

const URL = "https://hosty-cua8.onrender.com";
// const URL = "http://localhost:3000";

//upload directory
exports.uploadFile = async (req, res, next) => {
  // const mime = await import('mime');
  //zipped file from client side
  const uploadedFiles = req.files.upload;
  // https://hosty.cyclic.app/
  //unzip uploaded files
  const zip = new JSZip();
  //URLs for site
  // http://localhost:3000/hosty.deploy/302e9af3-0207-4321-8f4b-016e1d62984b/bestfive.test
  // http://localhost:3000/hosty.deploy/302e9af3-0207-4321-8f4b-016e1d62984b/style.css
  // http://localhost:3000/302e9af3-0207-4321-8f4b-016e1d62984b/img/
  const siteURL = `${req.protocol}://${req.get("host")}/${
    req.siteDirectory
  }.test`;
  const siteURLStatic = `${req.protocol}://${req.get("host")}/${req.siteID}`;
  // Load the zip file content
  zip
    .loadAsync(uploadedFiles.data)
    .then(async (zip) => {
      // creating a array to hold the uploaded files content with their filename
      console.log(zip.files);
      const files = await Promise.all(
        Object.keys(zip.files).map(async (filename) => {
          const file = zip.files[filename];
          let count = 0;

          let content;
          if (filename.endsWith(".jpg")) {
            content = await file.async("uint8array");
          } else {
            content = await file.async("string");
          }

          // Split the string into an array based on '/'
          let parts = filename.split("/");

          // Remove the first part
          parts.shift();

          // Join the remaining parts back into a string
          let filenameEdited = parts.join("/");

          // const mimeType = mime.getType(filenameEdited);

          return { filenameEdited, content };
          // return { filenameEdited, content, mimeType };
        })
      );

      //upload the files on AWS with the filename as key
      files.forEach((file) => {
        const uploadParams = {
          Key:
            file.filenameEdited == "index.html"
              ? siteURL
              : `${siteURLStatic}/${file.filenameEdited}`,
          Body: file.content,
          ContentType: file.mimeType,
        };

        storage.upload(uploadParams, (err, data) => {
          if (err) {
            throw err;
          }
        });
      });
    })
    .then(() => {
      SiteURL.create({ userId: req.siteID, url: siteURL })
        .then((result) => {
          res.send({
            status: "success",
            siteURL,
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((error) => {
      console.error(error);
      res.send({
        status: "error",
        siteURL: "/",
      });
    });
};

//upload single file
exports.uploadFileSingle = async (req, res, next) => {
  //getting file
  const uploadedFiles = req.files.upload;

  const uploadParams = {
    Key: req.siteDirectory,
    Body: uploadedFiles.data,
    ContentType: 'text/html'
  };

  const siteURL = `${URL}/${
    req.siteDirectory
  }.test`;

  storage.upload(uploadParams, (err, data) => {
    if (err) {
      console.error(`Error uploading`, err);
      res.render("Home", {
        page: "singleUpload",
        isLoggedIn,
        status: false,
        siteURL,
        err: "error",
      });
    } else {
      SiteURL.create({ userId: req.siteID, url: siteURL })
        .then((result) => {
          res.render("Home", {
            page: "singleUpload",
            isLoggedIn,
            status: true,
            siteURL,
            err: "",
          });
        })
        .catch((err) => {
          console.log(err);
          res.render("Home", {
            page: "singleUpload",
            isLoggedIn,
            status: false,
            siteURL,
            err: "error",
          });
        });
    }
  });

  // const fileDir =`${req.siteDirectory}/${directoryName}`;
  // fsP.mkdir(fileDir).then(re=>{
  //     fsP.writeFile(path.join(fileDir,'index.html'), uploadedFiles.data)
  //         .then(resp=>{
  //             //url for the uploaded files
  //             const url = `${req.protocol}://${req.get('host')}/site/${req.siteID}/${directoryName}`;

  //             const token = req.cookies.token;
  //             jwt.verify(token,process.env.SECRET_KEY,async (err, decoded) => {
  //                 if(err)
  //                 {
  //                     next(new Error('token_expired'));
  //                 }
  //                 const {userId} = decoded;
  //                 try{
  //                     const site=await SiteURL.create({userId,url});

  //                 }catch(err)
  //                 {

  //                 }

  //         });
  //         })
  //         .catch(err=>{
  //             next(new Error('server_error'));
  //         })
  // }).catch(err=>{
  //     next(new Error('server_error'));
  // })
};
