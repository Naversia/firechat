import React from 'react'
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';

export const Home = () => {
  return (
    <div className="home">
        <div className="container">
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}
export default Home;