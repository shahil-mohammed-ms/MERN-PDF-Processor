import {React,useState,useRef} from 'react'
import axios from '../../axios'
import IconPlusCircle from '../../assets/pluscircle/PlusCircle'
import './Home.css'



function Home() {
  const [addLogo,setAddLogo] = useState(true)
  const [imgUrl,setImgUrl] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
  const [checkboxStates, setCheckboxStates] = useState(Array(imgUrl.length).fill(false));
  const [checkboxNo, setCheckboxNo] = useState([]);

  const [pageNo,setPageNo] = useState(0)
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
     
      const response = await axios.post('/api/pdf/uploadpdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAddLogo(false)
     setImgUrl(response.data.FileDatas)
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

//`http://localhost:5000/files/pdf/1699527962658.pdf`

// for check box

const handleCheckboxChange = (index,e) => {

console.log(e.target.value)
  console.log(!checkboxStates[index])
  console.log(index)
  const isChecked = e.target.checked;

    if (isChecked) {
      // If checkbox is checked, add the index to the array
      setCheckboxNo([...checkboxNo, index]);
    } else {
      // If checkbox is unchecked, remove the index from the array
      setCheckboxNo(checkboxNo.filter(item => item !== index));
    }

  setCheckboxStates((prevStates) => {
    const newStates = [...prevStates];
    newStates[index] = !prevStates[index];
    return newStates;
  });
};


  return (
    <div className='home-Main' >
      
      <div className="home-Content">
     
     {
!addLogo?( <div className="createPdf">
  <IconPlusCircle onClick={handleIconClick} />
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
!addLogo? ( <div className="loadingicon">
  loading.....
</div> ):
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
{/* <img key={index} src={`http://localhost:5000/image/files/image/${url}`} alt="" className="pdfImgs" /> */}
<img key={index} src={`http://localhost:5000/image/files/image/1699619717954.pdf-02.png`} alt="" className="pdfImgs" />
</div>
))}
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