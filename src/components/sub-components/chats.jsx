import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from "firebase/firestore";
import '../../App.css'; // The number of '../' depends on the relative path from search.jsx to App.css
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../firebase';

const Chats = () => {

    const [chats, setChats] = useState([]);

    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);
    

    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            setChats(doc.data());
          });
    
          return () => {
            unsub();
          };
        };
    
        currentUser.uid && getChats();
      }, [currentUser.uid]);

      const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload:u})
      }


      return (
        <div className='chats'>
          {Object.entries(chats)
            .sort((a, b) => b[1].lastMessage?.date - a[1].lastMessage?.date) // Sort by the date property of lastMessage
            .map(([chatId, chat]) => (
              <div key={chatId}>
                <div className='userChat' onClick={() => handleSelect(chat.userInfo)}>
                  <img className="user-img" src={chat.userInfo.photoURL} alt="" />
                  <div className='userChatInfo'>
                    <span className='userChatName'>{chat.userInfo.displayName}</span>
                    <p className='userChatMsg'>{chat.lastMessage?.text}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      );
      
}
export default Chats;

