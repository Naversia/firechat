import Img from "../img/img.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import React, { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import UserService from "../services/users.service";
import { doc, setDoc } from "firebase/firestore";
import { child, get, set } from "firebase/database";

const Register = () => {
  const userService = new UserService();
  const [err, setErr] = useState(false);
  // const [displayName, setDisplayName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [file, setFile] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // setDoc(doc(db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // })


     // Write data
     async function Write() {
      await set(ref(db, "mycustomdata/somekey"), {
          username: "(v) username",
          email: "(v) email",
          profile_pic: "(v) url"
      })
  
      console.info("Data written to DB")
  }
  
  async function Read() {
      const dbRef = ref(db)
      var snapshot = await get(child(dbRef, `mycustomdata/somekey`))
  
      if (snapshot.exists()) {
          console.log("Data from DB:");
          console.log(snapshot.val());
      } else {
          console.log("No data available");
      }
  }
  
  async function WriteThenRead() {
      await Write()
      await Read()
      console.info("Done.")
  }
  
  WriteThenRead()
  



    //   .then(() => {
    //     console.log("sucsses");
    //   })
    //   .catch((err) => {
    //     console.error("error writing doc");
    //     console.error(err);
    //   });

    // const user = {
    //   displayName: e.target[0].value,
    //   email: e.target[1].value,
    //   password: e.target[2].value,
    //   photoURL: e.target[3].files,
    // };
    alert("handelSubmit");
    e.preventDefault();
    // return;
    // userService.post(user);
    // await setDoc(doc(db, "users"), {
    //   displayName: "e.target[0].value",
    //   email: "e.target[1].value",
    //   password: "e.target[2].value",
    //   photoURL: "e.target[3].files",
    // });
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //const date = new Date().getTime();
      const storageRef = ref(storage, displayName);

      // const customMetadata = {
      //   contentType: file.type,
      // };
      const uploadTask = await uploadBytes(storageRef, file, {
        // customMetadata,
      });

      const photoURL = await getDownloadURL(uploadTask.ref);
      //Update profile
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setErr(true);
      // setLoading(false);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Naversia's ChatBox</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="displayName"
            //onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            required
            type="email"
            placeholder="email"
            //onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="password"
            //onChange={(e) => setPassword(e.target.value)}
          />
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            // //onChange={(e) => setFile(e.target.value)}
          />
          <label htmlFor="file">
            <img src={Img} alt="" />
            <span>Add an Img</span>
          </label>
          <button type="submit">Sign Up</button>
          {/* {loading && "Uploading and compressing the image please wait..."} */}
          {err && <span>Something went wromg</span>}
        </form>
        <p>
          You Have Account all ready?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
