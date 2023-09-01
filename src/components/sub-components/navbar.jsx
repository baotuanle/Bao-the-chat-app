import React, { useContext } from 'react'
import { signOut } from 'firebase/auth';
import '../../App.css'; // The number of '../' depends on the relative path from search.jsx to App.css
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

    const {currentUser} = useContext(AuthContext);

    return (
        
        <div className='navbar'>
            <span className='chat-logo'>Bao Chat</span>
            <div className='user'>
                <img className="nav-img" src={currentUser.photoURL} alt="" />
                <span className='nav-user'>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)} className='nav-logout'>Log out</button>
            </div>
        </div>
    )
}

export default Navbar;