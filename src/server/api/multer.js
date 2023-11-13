const multer = require('multer');
const AWS = require('aws-sdk');
const { Readable } = require('stream');

// Initialize AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: 'arn:aws:s3:us-east-2:812347084154:accesspoint/soulunknown', 
  s3ForcePathStyle: true, 
});

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // File filter logic
    cb(null, true);
  }
});

async function uploadFileToS3(file) {
  const params = {
    Bucket: 'reviewbucket333',
    Key: `imgpath-${Date.now()}-${file.originalname}`,
    Body: Readable.from(file.buffer),
    // Additional parameters
  };

  return s3.upload(params).promise();
}

module.exports = { upload, uploadFileToS3 };

