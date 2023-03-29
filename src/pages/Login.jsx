import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit =  (e) => {
    e.preventDefault();
    // const email = e.target[0].value;
    // const password = e.target[1].value;

    // try {
      signInWithEmailAndPassword(auth, email, password).then((userCardential)=>{
        const user = userCardential.user;
        navigate("/");
      })
    .catch ((error) =>{
      setError(true);
    });
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Navision Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email"  onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
          <button type="submit">Sign in</button>
          {error && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;