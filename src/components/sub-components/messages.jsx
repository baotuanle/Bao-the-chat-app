import React, { useContext, useEffect, useState } from 'react'
import Message from './message';
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const {data} = useContext(ChatContext);
    const [chatId, setChatId] = useState(data.chatId);

    const [loading, setLoading] = useState(true); // Track loading state
  
    useEffect(() => {
      // This code block runs when the component mounts
      if (data) {
        // currentUser is available, you can perform actions here
        setLoading(false); // Set loading to false once currentUser is available
      }
    }, [data]); // Run this effect when currentUser changes

    console.log(data);

useEffect(() => {
    // Update chatId whenever data.chatId changes
    setChatId(data.chatId);
  }, [data.chatId]);

  useEffect(() => {
    if (!chatId) {
      // chatId is not available yet, you can add loading logic here
      return;
    }

    const unSub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;