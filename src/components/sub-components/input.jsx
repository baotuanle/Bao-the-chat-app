import React, { useContext, useEffect, useState } from 'react'
import Img from "../imgs/img.png"
import Attach from "../imgs/attach.png"
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);


    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(true);

    const [chatId, setChatId] = useState(data.chatID); // Initialize with an empty string or default value

    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const dateTime = `${hours}:${minutes}`;


  useEffect(() => {
    // This code block runs when the component mounts
    if (data) {
      // currentUser is available, you can perform actions here
      setLoading(false); // Set loading to false once currentUser is available
      // Ensure chatId is set only if data.chatId is available
      if (data.chatID) {
        setChatId(data.chatID);
      }
    }
  }, [data]); // Run this effect when currentUser changes or data changes

  
    const handleSend = async () => {
        if (!text) {
            return;
          }

        if (img) {
          const storageRef = ref(storage, uuid());
          
            await uploadBytesResumable(storageRef, img).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                      id: uuid(),
                      text,
                      senderId: currentUser.uid,
                      date: dateTime,
                      img: downloadURL,
                    }),
                  });
                });
              }
            );
          } else {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: dateTime,
              }),
            });
          }
      
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: dateTime,
          });
      
          await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
              text,
            },
            [data.chatId + ".date"]: dateTime,
          });
      
          setText("");
          setImg(null);
        };

    return (
        
        <div className="input">
            <input className="input-input" type="text" placeholder="Type something..." value={text} onChange={(e) => setText(e.target.value)} />
            <div className="send">
                <input type="file" style={{display:"none"}} id='file' onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor="file">
                    <img className="input-img" src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
        )
    }

export default Input;