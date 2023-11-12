import {React,useState,useRef} from 'react'
import axios from '../../axios'
import IconPlusCircle from '../../assets/pluscircle/PlusCircle'
import './Home.css'
import './HomeMobile.css'


function Home() {
  const [addLogo,setAddLogo] = useState(true)
  const [loading,setLoading] = useState(true)
  const [imgUrl,setImgUrl] = useState([])
  const [checkboxStates, setCheckboxStates] = useState(Array(imgUrl.length).fill(false));
  const [checkboxNo, setCheckboxNo] = useState([]);
  const [newImgUrl,setNewImgUrl] = useState([])
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [downloadBox,setDownloadBox] = useState(true)
  const [pdfBaseName,setPdfBaseName] = useState('')
  
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  

  const handleFileChange = async (e) => {
    setAddLogo(false)
   
    const selectedFile = e.target.files[0];

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);
    const storedToken = localStorage.getItem('Usertoken');
    try {
     console.log('token is ',storedToken)
     
      const response = await axios.post('/api/pdf/uploadpdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${storedToken}`
        },
      });
      
      
    setImgUrl(response.data.Datas)
     setLoading(false)
        // Set a flag when all images are loaded
        setAllImagesLoaded(true);
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

//`http://localhost:5000/files/pdf/1699527962658.pdf`

// for check box

const handleCheckboxChange = (index,e) => {

console.log('imgUrl',e.target.value)

  console.log(!checkboxStates[index])
  console.log(index)
  const isChecked = e.target.checked;

    if (isChecked) {
      // If checkbox is checked, add the index to the array

      setCheckboxNo([...checkboxNo, index]);
      const updatedImgUrl = [...newImgUrl, e.target.value];
      console.log(updatedImgUrl)
setNewImgUrl(updatedImgUrl);
    } else {
      // If checkbox is unchecked, remove the index from the array
      setCheckboxNo(checkboxNo.filter(item => item !== index));
      const ImgToRemove = e.target.value;
const updatedImgUrl = newImgUrl.filter((number) => number !== ImgToRemove);
console.log(updatedImgUrl)
setNewImgUrl(updatedImgUrl)
    }

  setCheckboxStates((prevStates) => {
    const newStates = [...prevStates];
    newStates[index] = !prevStates[index];
    return newStates;
  });
};

// api to convert selected images to pdf
const createButton =async(e)=>{
e.preventDefault()
const storedToken = localStorage.getItem('Usertoken');
try {
 // const response =await axios.post('/api/pdf/convertToPDF',newImgUrl)
 const response = await axios.post('/api/pdf/convertToPDF', newImgUrl, {
  headers: {
    'Authorization': `Bearer ${storedToken}`
  }
});

  setPdfBaseName(response.data.Datas.pdfBaseName)
  setDownloadBox(false)
  console.log('from server dwd',response.data)

} catch (error) {
  console.log(error)
}


}
const cancelButton =async(e)=>{
  e.preventDefault()

}

// download button

const handleDownloadPdf = async (e) => {
  e.preventDefault()
  const storedToken = localStorage.getItem('Usertoken');
  try {
    // Assuming you have the URL for the PDF on the server
    console.log(pdfBaseName+'.pdf')

    // Make a request to download the PDF using Axios
    const response = await axios.get(`http://localhost:5000/image/files/newCreatedPdf/${pdfBaseName+'.pdf'}`, {
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${storedToken}`
      } // Set the response type to blob
    });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
    downloadLink.download = 'downloaded-file.pdf';

    // Trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up the download link
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
};


  return (
    <div className='home-Main' >
      
      {downloadBox? <div className="home-Content">
     
     {
addLogo?( <div className="createPdf">
 
  <IconPlusCircle onClick={handleIconClick} className="iconLogoplus" />
  <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept='.pdf'
      />
      
</div> ):(
  <div className="EditPdf">
{
loading? (
<div className="loading-screen">
<div className="loader"></div>
<p>Loading...</p>
</div>
):
( <div className="pdfImg">
{imgUrl.map((url, index) => (
<div className="pdfImageboxes" key={index}>
 
  <span className="imgcheckbox"  >
  <input
              type="checkbox"
              name=""
              id={`checkbox-${index}`}
              className='checkbox'
              value={url}
              checked={checkboxStates[index]}
              onChange={(e) => handleCheckboxChange(index,e)}
            />
        .{checkboxNo.indexOf(index) !== -1 ? checkboxNo.indexOf(index) + 1 : ''} 
      </span>
<img key={index} src={`http://localhost:5000/image/files/image/${url}`} alt="" className="pdfImgs" 
 onLoad={() => console.log(`Image ${index + 1} loaded`)} />
{/* <img key={index} src={`http://localhost:5000/image/files/image/1699619717954.pdf-02.png`} alt="" className="pdfImgs" /> */}
</div>
))}

<div className='btnbox'>
  <button className="cancelButton" onClick={(e)=>{cancelButton(e)}} >Cancel</button>
  <button className="createButton" onClick={(e)=>{createButton(e)}} >Create</button>
</div>
</div> )

}

  </div>
)

     }
  
  
      </div>:(
        <div className="downloadbox">
<span className="dowdbtnspan">
  <button className="dowbtn" onClick={(e)=>{handleDownloadPdf(e)}} >Download Pdf</button>
</span>
        </div>
      )}

      
     

    </div>
  )
}

export default Home