const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const pdfModule = require('../../Modules/pdf/pdfController')

const fs = require('fs');
const pdfPoppler = require('pdf-poppler');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

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

// for managing pdf upload to storage test
router.post('/fileupload',upload.single('file'),pdfModule.fileUpload)



//for converting pdf to images

const pdfDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'pdf');
const imageDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'image');

// Ensure the directories exist, or create them
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });

const storagepdf = multer.memoryStorage();
const uploadpdf = multer({ storage: storagepdf });

router.post('/uploadpdf', uploadpdf.single('pdfFile'),pdfModule.ConvertPdfToImage)




// conv to pdf 




const NewCreatedpdfpdfDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'NewCreatedpdf');
fs.mkdirSync(NewCreatedpdfpdfDir, { recursive: true });


router.post('/convertToPDF', async (req, res) => {
  console.log('API reached');

  // Example image paths in the public folder
  const images = [
    'public/files/image/1699694248932.pdf-1.png',
    'public/files/image/1699694248932.pdf-2.png',
  ];

  // Create a PDF document
  const pdfDoc = new PDFDocument();
  const pdfBaseName = uuidv4();
  console.log('uuid is ', pdfBaseName);
  const NewpdfPath = path.join(NewCreatedpdfpdfDir, `${pdfBaseName}.pdf`);
  const pdfStream = fs.createWriteStream(NewpdfPath);

  // Pipe the PDF document to the file
  pdfDoc.pipe(pdfStream);

  // Embed each image in the PDF
  for (const imagePath of images) {
    try {
      // Read the image from the local file system
      const imageBuffer = fs.readFileSync(path.join(__dirname, '..', '..', imagePath));

      // Add a new page only if there is content to add
      if (pdfDoc.page.count > 0) {
        pdfDoc.addPage();
      }

      // Embed the image in the PDF
      pdfDoc.image(imageBuffer, 0, 0, { width: 600 });
    } catch (error) {
      console.error('Error reading image:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
      return;
    }
  }

  // Finalize the PDF and close the file stream
  pdfDoc.end();
  pdfStream.on('finish', () => {
    res.json({ success: true, pdfPath: NewpdfPath });
  });

  // Handle errors
  pdfStream.on('error', (error) => {
    console.error('Error creating PDF:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  });
});




module.exports = router;