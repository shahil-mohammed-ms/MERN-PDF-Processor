const pdfPoppler = require('pdf-poppler');
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

otherHelper.sendResponse = async (res,message,Datas)=>{
console.log(message)
  return res.status(200).json({ message, Datas });


}

module.exports = otherHelper;