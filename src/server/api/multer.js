const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Configure the AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // Consider adding the region if necessary
});

const s3 = new AWS.S3();

// Configure multer to use multer-s3 for uploading files to the S3 access point
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'arn:aws:s3:us-east-2:812347084154:accesspoint/soulunknown', // Replace with your access point ARN
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, 'imgpath-' + uniqueSuffix + ext); // Naming the file
    }
  })
});

module.exports = upload;


