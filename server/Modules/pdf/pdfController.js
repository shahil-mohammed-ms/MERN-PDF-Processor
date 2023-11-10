const multer = require('multer');

const pdfController = {}




pdfController.fileUpload = async (req,res) =>{

try {

  const file = req.file;
  const pdfBuffer = req.file.buffer;
  console.log('Received file:', file);
  console.log('Received file buffer :', pdfBuffer);
  res.json('file upload success')
  
} catch (error) {
  console.log(error)
}

}

module.exports=pdfController