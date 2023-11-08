const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set the directory for the uploads to /CarReview/src/server/uploads
const uploadDir = path.join(__dirname, '..', '..', 'uploads'); // Goes up one level to /CarReview/src/server
// Log the upload directory path
console.log(`Upload directory is set to: ${uploadDir}`);
// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // This will save files in /CarReview/src/server/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'imgpath-' + uniqueSuffix + ext); // This saves files as 'imgpath-timestamp.ext'
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
