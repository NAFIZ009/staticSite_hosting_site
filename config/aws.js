const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports=s3;

//  s3.listObjects(listParams, (err, data) => {
//   if (err) {
//     console.error('Error listing objects in S3:', err);
//   } else {
//     console.log('Objects in the S3 bucket:', data.Contents);
//     data.Contents.forEach(ele=>{
//         const deleteParams = {
//             Bucket: bucketName,
//             key: ele.key
//         };

//         s3.deleteObject(deleteParams, (errs, DeleteData) => {
//             if (err) {
//               console.error('Error deleting object from S3:', errs);
//             } else {
//               console.log('Object deleted successfully:', DeleteData);
//             }
//           });

//     })
//   }
// });
// const bucketName = 'cyclic-long-puce-crow-tie-sa-east-1';

// Step 1: List objects in the S3 bucket
// const listParams = {
//   Bucket: bucketName,
// };


// s3.listObjects(listParams, (listErr, listData) => {
//     if (listErr) {
//       console.error('Error listing objects in S3:', listErr);
//     } else {
//       // Step 2: Check if there are any objects
//       if (listData.Contents.length > 0) {
//         // Step 3: Delete each object
//         const deleteParams = {
//           Bucket: bucketName,
//           Delete: {
//             Objects: listData.Contents.map(obj => ({ Key: obj.Key })),
//             Quiet: false, // Set to true to suppress response output
//           },
//         };
  
//         s3.deleteObjects(deleteParams, (deleteErr, deleteData) => {
//           if (deleteErr) {
//             console.error('Error deleting objects from S3:', deleteErr);
//           } else {
//             console.log('Objects deleted successfully:', deleteData.Deleted);
//           }
//         });
//       } else {
//         console.log('No objects found in the S3 bucket.');
//       }
//     }
//   });