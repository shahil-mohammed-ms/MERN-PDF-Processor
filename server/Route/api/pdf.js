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
console.log(req.body)
const imageFileNames = req.body;
const images =await Promise.all(imageFileNames.map((fileName) => 'public/files/image/' + fileName));


  // Create a PDF document
  const pdfDoc = new PDFDocument();
  const pdfBaseName = uuidv4();
  console.log('uuid is ', pdfBaseName);
  const NewpdfPath = path.join(NewCreatedpdfpdfDir, `${pdfBaseName}.pdf`);
  const pdfStream = fs.createWriteStream(NewpdfPath);

  // Pipe the PDF document to the file
  pdfDoc.pipe(pdfStream);

  // Embed each image in the PDF
  let isFirstImage = true; 
  for (const imagePath of images) {
    try {
      // Read the image from the local file system
      const imageBuffer = fs.readFileSync(path.join(__dirname, '..', '..', imagePath));

      // Add a new page only if there is content to add
      // if (pdfDoc.page.count > 0) {
      //  pdfDoc.addPage();
      // }
      if (!isFirstImage) {
        pdfDoc.addPage();
      }
  // Set the flag to false after processing the first image
  isFirstImage = false;

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
    res.json({ success: true, pdfPath: NewpdfPath,pdfBaseName });
  });

  // Handle errors
  pdfStream.on('error', (error) => {
    console.error('Error creating PDF:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  });
});




module.exports = router;