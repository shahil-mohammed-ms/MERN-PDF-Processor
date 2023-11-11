const pdfPoppler = require('pdf-poppler');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const otherHelper = {};

otherHelper.convertToImages = async ( pdfPath, outputDir, filenameunq) => {
  const fileExtension = filenameunq.split('.').pop();
  const uniqueFilename = `${Date.now()}.${fileExtension}`;
  const pageInfo = await pdfPoppler.info(pdfPath);

  const options = {
    format: 'png',
    out_dir: outputDir,
    out_prefix: uniqueFilename,
    page: null,
  };
 

  try {
    const result = await pdfPoppler.convert(pdfPath, options)

    const padWithZero = (number) =>{
if(pageInfo.pages<10){

  return number

}else{

  if(number < 10){

    return  `0${number}`

  }else{
    return  number

  }
  
}

    }

const imageNames = Array.from({ length: pageInfo.pages }, (_, index) =>
  `${uniqueFilename}-${padWithZero(index + 1)}.png`
);

    return imageNames
  
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    throw error; // Propagate the error to handle it in the route handler
  }
};


// sending response
otherHelper.sendResponse = async (res,message,Datas)=>{
console.log(message)
  return res.status(200).json({ message, Datas });


}
//converting selected images to pdf

otherHelper.convertToPdf = async(res,pdfDoc,NewpdfPath,pdfBaseName,images)=>{
  const pdfStream = fs.createWriteStream(NewpdfPath);
    // Pipe the PDF document to the file
    pdfDoc.pipe(pdfStream);
    // Embed each image in the PDF
    let isFirstImage = true; 
    for (const imagePath of images) {
      try {
        // Read the image from the local file system
        const imageBuffer = fs.readFileSync(path.join(__dirname, '..', '..','server', imagePath));
        
        // Add a new page only if there is content to add
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
    pdfDoc.end();
    
    pdfStream.on('finish', () => {
      
      res.json({ success: true, pdfPath: NewpdfPath,pdfBaseName });
    });
  
    // Handle errors
    pdfStream.on('error', (error) => {
      console.error('Error creating PDF:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    });


}

module.exports = otherHelper;