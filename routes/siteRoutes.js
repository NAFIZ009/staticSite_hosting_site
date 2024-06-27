const express = require("express");
const s3 = require("../config/firebase");
const JSZip = require("jszip");
const sharp = require("sharp");
const imageSize = require("image-size");
const imageDataURI = require("image-data-uri");
const storage = require("../models/Storage");

const siteRoute = express();

// const URL = "https://hosty-cua8.onrender.com";

//   hosty.deploy/12932c68-45ce-4d2d-92e5-15d5c0850598/Html

siteRoute.get("/*", (req, res) => {
  // const url = req.url;
  // const {id,name} = req.params;

  // http://localhost:3000/hosty.deploy/302e9af3-0207-4321-8f4b-016e1d62984b.bestfive/bestfive.test
  // http://localhost:3000/hosty.deploy/302e9af3-0207-4321-8f4b-016e1d62984b/style.css
  // Extract and manipulate the path segment
  const pathSegments = req.url.split("/");
  const segmentToModify = pathSegments[1]; // This is the segment to modify

  // Replace '.' with '/'
  const modifiedSegment = segmentToModify.replace(".", "/");

  // Reconstruct the path
  pathSegments[1] = modifiedSegment;
  const modifiedPath = pathSegments.slice(1).join("/");

  // Extract the part without the part starting from '.' and ending with '/'
  const regex = /\.([^/]*)\//;
  const fullStringWithoutDotToSlash = req.url.replace(regex, "/");

  let getParams = {};
  if (req.url.endsWith(".test") || req.url.endsWith("index.html")) {
    getParams = {
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: `hosty.deploy${fullStringWithoutDotToSlash}`,
    };
  } else {
    getParams = {
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: `hosty.deploy/${modifiedPath}`,
    };
  }

  console.log(req.url, modifiedPath);
  console.log(getParams);

  storage.getObject(getParams, async (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).json({ error: "Resource not found" });
    } else {
      if (
        req.url.endsWith(".jpg") ||
        req.url.endsWith(".jpeg") ||
        req.url.endsWith(".png")
      ) {
        res.send(data.Body);
      } else {
        const codes = data.Body.toString("utf-8");
        res.send(codes);
      }
    }
  });

  //   console.log(getParams.Key);
  //   s3.getObject(getParams,async (err, data) => {
  //     if (err) {
  //       console.error('Error getting object from S3:', err);
  //     } else {
  //       console.log('Object retrieved successfully:', data.Body);
  //     const zip = new JSZip();
  //     const unzipResult = await zip.loadAsync(data.Body);

  //     // Access the unzipped files
  //     const files = Object.values(unzipResult.files);

  //     // Access the content of a specific file (e.g., index.html)
  //     // const indexHtmlContent = await files.find(file => file.name === 'index.html').async('text');
  //     const indexHtmlContent = await files.async('text');

  //     // Do something with the unzipped data
  //     console.log(indexHtmlContent);
  //       // Access the object content using data.Body
  //     }
  //   });
});

module.exports = siteRoute;
