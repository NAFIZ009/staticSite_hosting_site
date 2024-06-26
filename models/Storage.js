const firebase = require('../config/firebase');

/**
 * Upload a file to Firebase Storage.
 * 
 * @param {Object} uploadParams - Parameters for the upload.
 * @param {string} uploadParams.Key - The file path in the storage bucket.
 * @param {Buffer|Stream} uploadParams.Body - The file content to upload.
 * @param {function} callback - Callback function to handle the response.
 */
function upload(uploadParams, callback) {

  const file = firebase.bucket.file(uploadParams.Key);
  console.log(firebase.bucket.name,file.name)
  const stream = file.createWriteStream({
    metadata: {
      contentType: uploadParams.ContentType,
    },
  });

  stream.on('error', (err) => {
    callback(err);
  });

  stream.on('finish', () => {
    file.makePublic().then(() => {
      callback(null, {
        message: 'File uploaded successfully',
        publicUrl: `https://storage.googleapis.com/${firebase.bucket.name}/${file.name}`
      });
    });
  });

  stream.end(uploadParams.Body);
}

function getObject(getParams, callback) {
    let key = getParams.Key;
  
    // Remove .test from the key if it exists
    if (key.endsWith('.test')) {
      key = key.replace('.test', '');
    }
  
    const file = firebase.bucket.file(key);
  
    file.download((err, contents) => {
      if (err) {
        callback(err);
      } else {
        callback(null, { Body: contents });
      }
    });
}

function deleteObject(deleteParams, callback) {
  const file = firebase.bucket.file(deleteParams.Key);

  file.delete((err, apiResponse) => {
    if (err) {
      callback(err);
    } else {
      callback(null, apiResponse);
    }
  });
}

module.exports = {
  upload,
  getObject,
  deleteObject
};
