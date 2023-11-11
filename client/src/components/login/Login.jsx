import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './Login.css'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();


  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');

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
      const response = await axios.post('/UserLogin', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('Usertoken', token);
      console.log(token);
      console.log('Login successful:', response.data);

      setEmail('');
      setPassword('');
      navigate('/UserHome')
    } catch (error) {
      // Handle authentication errors (e.g., display error message)

      console.error('Authentication failed:', error);
      // Reload the current page
// window.location.reload();

    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <h2>Login</h2>
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
      <div className="inputContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value="Log in"
        />
      </div>
    </div>
  );
}

export default Login;