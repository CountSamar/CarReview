const multer = require('multer');
const AWS = require('aws-sdk');
const { Readable } = require('stream');

// Initialize AWS S3 with Access Point ARN
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  // region: 'us-east-2', // Uncomment if necessary
  endpoint: 'arn:aws:s3:us-east-2:812347084154:accesspoint/soulunknown', // Access Point ARN
  s3ForcePathStyle: true, // Necessary for access points
});

// Custom multer storage engine
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Add any file filters or validations here
    cb(null, true);
  }
}).single('imgpath');

// Function to upload a file to S3
async function uploadFileToS3(file) {
  const params = {
    Bucket: 'your-bucket-name', // Regular bucket name
    Key: `imgpath-${Date.now()}-${file.originalname}`, // File key
    Body: Readable.from(file.buffer),
    // Add other necessary S3 parameters like ContentType, ACL, etc.
  };

  return s3.upload(params).promise();
}

// Export the upload middleware and the S3 upload function
module.exports = { upload, uploadFileToS3 };


