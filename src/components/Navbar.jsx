import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext ";
import { useAuthState } from "react-firebase-hooks/auth";
import LogOut from "./LogOut";


const Navbar = () => {
  const { currentUser } = useContext(AuthContext);


  const [user] = useAuthState(auth);
    console.log(user);
    return (
        <div> <div className="hadderNameTag">
            <div className="nameTag">{user ? <><h1 className="CurrentUserTag">{user.displayName}<p><LogOut user ={user}/></p></h1></> : null}</div>
        </div>

       

   
    <div className="navbar">
      <span className="logo">Naversia's Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
    </div>
  );
  
};

export default Navbar;
