import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc, query, where, collection, getDocs } from "firebase/firestore"; // Import Firestore functions for querying
import { Link, useNavigate } from "react-router-dom"
import '../App.css'

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Check if the display name is already taken
      const displayNameQuery = query(collection(db, "users"), where("displayName", "==", displayName));
      const displayNameQuerySnapshot = await getDocs(displayNameQuery);

      if (!displayNameQuerySnapshot.empty) {
        // Display name is already taken
        setErrorMessage("Display name is already taken");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Access the authenticated user from the UserCredential

      const storageRef = ref(storage, displayName);
      console.log(storageRef);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile using the correct user object
            await updateProfile(user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", user.uid), {});
            navigate("/");

          } catch (err) {
            setErrorMessage("Something went wrong. Please try again later.");
            console.error(err);
          }
        });
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email is already in use. Please choose another email.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <div className='register'>
      <div className='formContainer'>
        <div className='formWrapper'>
          <span className='logo'>Bao Chat</span>
          <span className='title'>Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='display name' required/>
            <input type="email" placeholder='email' required/>
            <input type="password" placeholder='password' required/>
            <input style={{ display: "none" }} type="file" id='file' />
            <label htmlFor="file">Add a photo</label>
            <button>Sign Up</button>
            {errorMessage && <span className="error">{errorMessage}</span>}
          </form>
          <p className='no-acc'>You do not have an account? <Link to="/login">Login</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
