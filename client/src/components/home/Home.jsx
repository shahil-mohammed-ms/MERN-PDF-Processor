import {React,useState,useRef} from 'react'
import axios from '../../axios'
import IconPlusCircle from '../../assets/pluscircle/PlusCircle'
import './Home.css'

function Home() {

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Replace 'http://your-server-endpoint' with your actual server endpoint
      const response = await axios.post('/api/pdf/fileupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='home-Main' >
      
      <div className="home-Content">
     
     {
true?( <div className="createPdf">
  <IconPlusCircle onClick={handleIconClick} />
  <input
        type='file'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept='.pdf'
      />
      
</div> ):('')

     }
  
      </div>

    </div>
  )
}

export default Home