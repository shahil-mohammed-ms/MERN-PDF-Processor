const multer = require('multer');
const path = require('path');
const fs = require('fs');
const otherHelper = require('../../Helper/other.helper')
const pdfPoppler = require('pdf-poppler');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
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




// Images to pdf

const NewCreatedpdfpdfDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'NewCreatedpdf');     //directory for new pdf
fs.mkdirSync(NewCreatedpdfpdfDir, { recursive: true });                          // create folder if no folder is present

pdfController.ConvertImageToPdf= async(req,res)=>{
  const imageFileNames = req.body;
  const images =await Promise.all(imageFileNames.map((fileName) => 'public/files/image/' + fileName));
  
  
    // Create a PDF document
    const pdfDoc = new PDFDocument();
    const pdfBaseName = uuidv4();
    const NewpdfPath = path.join(NewCreatedpdfpdfDir, `${pdfBaseName}.pdf`);

await otherHelper.convertToPdf(res,pdfDoc,NewpdfPath,pdfBaseName,images)



}




// const NewCreatedpdfpdfDir = path.resolve(__dirname, '..', '..', 'public', 'files', 'NewCreatedpdf');     //directory for new pdf
// fs.mkdirSync(NewCreatedpdfpdfDir, { recursive: true });                          // create folder if no folder is present

// pdfController.ConvertImageToPdf= async(req,res)=>{
//   const imageFileNames = req.body;
//   const images =await Promise.all(imageFileNames.map((fileName) => 'public/files/image/' + fileName));
  
  
//     // Create a PDF document
//     const pdfDoc = new PDFDocument();
//     const pdfBaseName = uuidv4();
//     const NewpdfPath = path.join(NewCreatedpdfpdfDir, `${pdfBaseName}.pdf`);
//     const pdfStream = fs.createWriteStream(NewpdfPath);
//     // Pipe the PDF document to the file
//     pdfDoc.pipe(pdfStream);
//     // Embed each image in the PDF
//     let isFirstImage = true; 
//     for (const imagePath of images) {
//       try {
//         // Read the image from the local file system
//         const imageBuffer = fs.readFileSync(path.join(__dirname, '..', '..', imagePath));
  
//         // Add a new page only if there is content to add
//         // if (pdfDoc.page.count > 0) {
//         //  pdfDoc.addPage();
//         // }
//         if (!isFirstImage) {
//           pdfDoc.addPage();
//         }
//     // Set the flag to false after processing the first image
//     isFirstImage = false;
  
//         // Embed the image in the PDF
//         pdfDoc.image(imageBuffer, 0, 0, { width: 600 });
//       } catch (error) {
//         console.error('Error reading image:', error);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//         return;
//       }
//     }
  
//     // Finalize the PDF and close the file stream
//     pdfDoc.end();
//     pdfStream.on('finish', () => {
//       res.json({ success: true, pdfPath: NewpdfPath,pdfBaseName });
//     });
  
//     // Handle errors
//     pdfStream.on('error', (error) => {
//       console.error('Error creating PDF:', error);
//       res.status(500).json({ success: false, error: 'Internal Server Error' });
//     });

// }



module.exports=pdfController