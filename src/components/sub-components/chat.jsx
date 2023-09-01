import React, { useContext, useEffect, useState } from 'react'
import Cam from "../imgs/cam.png"
import Add from "../imgs/add.png"
import More from "../imgs/more.png"
import Messages from "./messages"
import Input from "./input"
import { ChatContext } from '../../context/ChatContext'
import '../../App.css'; // The number of '../' depends on the relative path from search.jsx to App.css

const Chat = () => {

    const {data} = useContext(ChatContext);

    const [loading, setLoading] = useState(true); // Track loading state
  
    useEffect(() => {
      // This code block runs when the component mounts
      if (data) {
        // currentUser is available, you can perform actions here
        setLoading(false); // Set loading to false once currentUser is available
      }
    }, [data]); // Run this effect when currentUser changes


    return (
        
        <div className='chat'>
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img className="chatIcons-img" src={Cam} alt="" />
                    <img className="chatIcons-img" src={Add} alt="" />
                    <img className="chatIcons-img" src={More} alt="" />
                </div>
            </div>
            <Messages/>
            <Input/>
        </div>
    )
}

export default Chat;