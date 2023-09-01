import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, [message]);

    return (
        <div ref={ref}  className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img className='messageInfo-img' src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span className='msg-time'>{message.date}</span>
            </div>
            <div className="messageContent">
                <p className='users-msg' >{message.text}</p>
                {message.img && <img className='users-img' src={message.img} alt="" />}
            </div>
        </div>
    )
}

export default Message;