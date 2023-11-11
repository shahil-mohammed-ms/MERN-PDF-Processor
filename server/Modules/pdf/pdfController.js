const multer = require('multer');
const path = require('path');
const fs = require('fs');
const otherHelper = require('../../Helper/other.helper')
const pdfPoppler = require('pdf-poppler');
const pdfController = {}

//directories
const pdfDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'pdf');  // directory to pdf
const imageDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'image');// directory to Image
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(imageDir, { recursive: true });


pdfController.ConvertPdfToImage = async (req, res) => {
 
  try {
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
    const FileDatas = await otherHelper.convertToImages(pdfFilePath, imageDir, filenameunq);

    // Send a response to the client with the list of image names
    

    otherHelper.sendResponse(res,'File uploaded and converted successfully', FileDatas )
    

  } catch (error) {
    console.error('Error converting PDF to images:', error);
    // Send an error response to the client
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};









module.exports=pdfController