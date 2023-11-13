const multer = require('multer');
const AWS = require('aws-sdk');
const { Readable } = require('stream');

// Initialize AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2', // Set to your bucket's region
});

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload only images.'), false);
    }
  }
});

async function uploadFileToS3(file) {
  const params = {
    Bucket: 'reviewbucket333',
    Key: `imgpath-${Date.now()}-${file.originalname}`,
    Body: Readable.from(file.buffer),
    ContentType: file.mimetype, // Set the content type
    // Optionally, you can add 'ACL: "public-read"' if you want the file to be publicly accessible
  };

  return s3.upload(params).promise();
}

module.exports = { upload, uploadFileToS3 };
