const multer = require('multer');
const path = require('path');

// Ensure the uploads directory exists.
const uploadDir = path.join(__dirname, '..', 'uploads'); // Adjust the path according to your project structure
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'imgpath-' + uniqueSuffix + ext); // This line constructs the filename as 'imgpath-timestamp.ext'
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
