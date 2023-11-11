import {React,useState,useRef} from 'react'
import axios from '../../axios'
import IconPlusCircle from '../../assets/pluscircle/PlusCircle'
import './Home.css'



function Home() {
  const [addLogo,setAddLogo] = useState(true)
  const [loading,setLoading] = useState(true)
  const [imgUrl,setImgUrl] = useState([])
  const [checkboxStates, setCheckboxStates] = useState(Array(imgUrl.length).fill(false));
  const [checkboxNo, setCheckboxNo] = useState([]);
  const [newImgUrl,setNewImgUrl] = useState([])
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  
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

    try {
     
      const response = await axios.post('/api/pdf/uploadpdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
try {

//  const newarray= await Promise.all(newImgUrl.map((fileName) => 'public/files/image/' + fileName))
// console.log('object')
//  console.log(newarray)
// console.log('object')
  const response =await axios.post('/api/pdf/convertToPDF',newImgUrl)

  console.log(response.data)

} catch (error) {
  console.log(error)
}


}
const cancelButton =async(e)=>{
  e.preventDefault()

}


  return (
    <div className='home-Main' >
      
      <div className="home-Content">
     
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
  
  
      </div>

      
     

    </div>
  )
}

export default Home