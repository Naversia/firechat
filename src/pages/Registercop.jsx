import Img from "../img/img.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { db } from "../firebase/database";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();

    // const displayName = e.target[0].value;
    // const email = e.target[1].value;
    // const password = e.target[2].value;
    // const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      // const date = new Date().getTime();
      // const storageRef = ref(storage, `${displayName+date}`);
      // const uploadTask = await uploadBytesResumable(storageRef, file);
       
      //  uploadTask.on(
      //   (error) => {
      //     setErr(true);
      //   },()=>{

        

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            // await setDoc(doc(db, "userChats", res.user.uid), {});
            // navigate("/");
          
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Naversia's ChatBox</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="displayName" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Img} alt="" />
            <span>Add an Img</span>
          </label>
          <button disabled={loading}>Sign Up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wromg</span>}
        </form> 
           <p>You Have Account all ready?<Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};
}
export default Register;
