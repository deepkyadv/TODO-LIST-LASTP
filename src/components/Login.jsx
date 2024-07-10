import React, { useState } from 'react';
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signInUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                alert("You are successfully logged in");
                setEmail("");  // Reset email
                setPassword("");  // Reset password
                navigate("/todoList");  // Navigate to TodoList
            })
            .catch((err) => {
                console.log(err);
                alert("Login failed: " + err.message);
            });
    };

    return (
        <>
            <div className='sign-in'>
                <h1>Login Page</h1>
                <label>Email</label>
                <input 
                    type='email'
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label>Password</label>
                <input 
                    type='password' 
                    placeholder='Enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button onClick={signInUser}>Login</button>
            </div>
        </>
    );
}

export default Login;
