import React from 'react'
import Navbar from "./navbar"
import Search from './search';
import Chats from './chats';
import '../../App.css'; // The number of '../' depends on the relative path from search.jsx to App.css


const Sidebar = () => {
    return (
        
        <div className='sidebar'>
            <Navbar/>
            <Search/>
            <Chats/>
        </div>
    )
}

export default Sidebar;