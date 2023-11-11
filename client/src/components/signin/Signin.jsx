import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom';
import axios from '../../axios'
import './Signin.css'

function Signin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');


    if (name === '') {
      setNameError('Please enter your email');
      return;
    }
    if (email === '') {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if (password === '') {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    try {
      // Make a POST request to your server endpoint with the user's credentials
      const response = await axios.post('/UserSignup', {
        name,
        email,
        password,
      });
      navigate('/Userlogin')
    
    } catch (error) {
      // Handle authentication errors (e.g., display error message)
      setError('Authentication failed. Please check your credentials.');
    }
  };
  return (
    <div className="mainContainer">
    <div className="titleContainer">
      <h2>Sign in</h2>
    </div>
    <br />
    <div className="inputContainer">
      <input
        value={name}
        placeholder="Enter your name here"
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        type="name"
      />
      <label className="errorLabel">{nameError}</label>
    </div>
    <br />
    <div className="inputContainer">
      <input
        value={email}
        placeholder="Enter your email here"
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
        type="email"
      />
      <label className="errorLabel">{emailError}</label>
    </div>
    <br />
    <div className="inputContainer">
      <input
        value={password}
        placeholder="Enter your password here"
        onChange={(e) => setPassword(e.target.value)}
        className="inputBox"
        type="password"
      />
      <label className="errorLabel">{passwordError}</label>
    </div>
    <br />
    <div className="alreadyhaveaccount">
  <a href="/login">Already have an account</a>
</div>
<br/>
    <div className="inputContainer">
      <input
        className="inputButton"
        type="button"
         onClick={handleSubmit}
        value="Sign in"
      />
    </div>
  </div>
  )
}

export default Signin