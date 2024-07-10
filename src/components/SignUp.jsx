import React from 'react';
import "./SignUp.css";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {app} from "../firebase";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const auth = getAuth(app);

function SignUp() {
    const [email, setEmail] = useState(" ");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const createUser = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(value=>alert("You are sign up successfully"));
        setEmail(" ");
        setPassword(" ");
    }

  return (
   <>
   <div className='sign-up'>
   <h1>Signup page</h1>
   <label>Email</label>
   <input type='email'
   onChange={e=>setEmail(e.target.value)}  
   placeholder='enter your email'
   value={email}
   required
   />
   <label>Password</label>
   <input type='password' 
   onChange={e=>setPassword(e.target.value)}
   placeholder='enter your password'
   value={password}
   required
   />
  <button onClick={createUser}>Sign Up</button>
  <p>Or</p>
  <button onClick={() => navigate("/login")}>Login</button>
  </div>
   </>
  )
}

export default SignUp