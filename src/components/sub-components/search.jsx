import React, { useContext, useState, useEffect } from 'react'
import { collection, getDocs, query, setDoc, where, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import '../../App.css'; // The number of '../' depends on the relative path from search.jsx to App.css
import { db } from '../../firebase'; // Adjust the path as needed
import { AuthContext } from '../../context/AuthContext';

const Search = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // Track loading state
  
    useEffect(() => {
      // This code block runs when the component mounts
      if (currentUser) {
        // currentUser is available, you can perform actions here
        setLoading(false); // Set loading to false once currentUser is available
      }
    }, [currentUser]); // Run this effect when currentUser changes

    const handleSearch = async () => {
        const q = query(
          collection(db, "users"),
          where("displayName", "==", username)
        );
    
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        } catch (err) {
          setErr(true);
        }
      };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async () => {
      //check whether the group(chats in firestore) exists, if not create
      const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
      console.log(user.uid);
      console.log(currentUser.uid);
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
  
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
  
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {}
  
      setUser(null);
      setUsername("")
    };

    return (
        
        <div className='search'>
            <div className='searchform'>
                <input className='searchInput' type="text" placeholder='Find user' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}/>
            </div>
            {err && <span>User not found</span> }
            { user && <div className='userChat' onClick={handleSelect}>
                <img className="user-img" src={user.photoURL} alt="" />
                <div className='userChatInfo'>
                    <span className='userChatName'>{user.displayName}</span>
                </div>
            </div>}
        </div>
        
    )
}

export default Search;