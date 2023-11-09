const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfModule = require('../../Modules/pdf/pdfController')

// var Storage = multer.diskStorage({
//   destination: "./public/files/pdf",
//   filename: (req, file, cb) => {
//     // Extract the original file extension
//     const fileExtension = file.originalname.split(".").pop();

//     // Generate a unique filename based on the current timestamp
//     const uniqueFilename = `${Date.now()}.${fileExtension}`;

//     // Set the filename for storing the image
//     cb(null, uniqueFilename);
//   },
// });
var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Resolve the absolute path for the destination
    const absolutePath = path.resolve(__dirname, '..', '..',  'public', 'files', 'pdf');
    cb(null, absolutePath);
  },
  filename: function (req, file, cb) {
    // Extract the original file extension
    const fileExtension = file.originalname.split(".").pop();

    // Generate a unique filename based on the current timestamp
    const uniqueFilename = `${Date.now()}.${fileExtension}`;

    // Set the filename for storing the image
    cb(null, uniqueFilename);
  },
});

var upload = multer({
  storage: Storage,
});

// for managing pdf upload to storage
router.post('/fileupload',upload.single('file'),pdfModule.fileUpload)


module.exports = router;