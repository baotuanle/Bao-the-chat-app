import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import '../App.css'
import { useNavigate, Link} from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);

      // Check error code and set error message accordingly
      if (error.code === "auth/user-not-found") {
        setErrorMessage("User not found");
      } else if (error.code === "auth/wrong-password") {
        setErrorMessage("Incorrect password");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className='register'>
      <div className='formContainer'>
        <div className='formWrapper'>
          <span className='logo'>Bao Chat</span>
          <span className='title'>Login</span>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder='email'/>
            <input type="password" placeholder='password'/>
            <button>Sign In</button>
            {errorMessage && <span className='err'>{errorMessage}</span>}
          </form>
          <p className='no-acc'>You don't have an acccount? <Link to="/register" >Sign up</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
