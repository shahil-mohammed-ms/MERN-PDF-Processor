const multer = require('multer');

const pdfController = {}




pdfController.fileUpload = async (req,res) =>{

try {

  const file = req.file;
  console.log('Received file:', file);
  res.json('file upload success')
  
} catch (error) {
  console.log(error)
}

}

module.exports=pdfController