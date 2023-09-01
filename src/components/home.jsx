import React from 'react'
import Sidebar from "./sub-components/sidebar"
import Chat from "./sub-components/chat"
import "../App.css"

const Home = () => {
    return (
    <div className='home'>
        <div className="container">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
    )
}

export default Home