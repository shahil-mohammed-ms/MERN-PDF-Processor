const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfModule = require('../../Modules/pdf/pdfController')
const fs = require('fs');
const pdfPoppler = require('pdf-poppler');

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





//for converting pdf to images

const pdfDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'pdf');
const imageDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'image');

// Ensure the directories exist, or create them
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const storagepdf = multer.memoryStorage();
const uploadpdf = multer({ storage: storagepdf });

router.post('/uploadpdf', uploadpdf.single('pdfFile'), async (req, res) => {
  // Assuming the input field for the file is named 'pdfFile'
  console.log(req.file);

  // Check if a file was provided
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Save the uploaded PDF to the pdfDir
  const pdfFilePath = path.join(pdfDir, 'uploaded.pdf');
  fs.writeFileSync(pdfFilePath, req.file.buffer);

  // Get the original filename from the uploaded file
  const filenameunq = req.file.originalname;

  // Convert the uploaded PDF to images
  // await convertToImages( pdfFilePath, imageDir, filenameunq);
  const FileDatas = await convertToImages(pdfFilePath, imageDir, filenameunq);

  // Send a response to the client with the list of image names
  return res.status(200).json({ message: 'File uploaded and converted successfully', FileDatas });


});

const convertToImages = async ( pdfPath, outputDir, filenameunq) => {
  const fileExtension = filenameunq.split('.').pop();
  const uniqueFilename = `${Date.now()}.${fileExtension}`;
  const pageInfo = await pdfPoppler.info(pdfPath);
  console.log(pageInfo.pages)

  const options = {
    format: 'png',
    out_dir: outputDir,
    out_prefix: uniqueFilename,
    page: null,
  };
 

  try {
    const result = await pdfPoppler.convert(pdfPath, options)

    // Create an array of image names based on page numbers
    // const imageNames = Array.from({ length: pageInfo.pages }, (_, index) =>
    //   `${uniqueFilename}-${index + 1}.png`
    // );
    const padWithZero = (number) => (number < 10 ? `0${number}` : number);

const imageNames = Array.from({ length: pageInfo.pages }, (_, index) =>
  `${uniqueFilename}-${padWithZero(index + 1)}.png`
);

    return imageNames
  
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    throw error; // Propagate the error to handle it in the route handler
  }
};


module.exports = router;