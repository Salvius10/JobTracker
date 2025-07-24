import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
const LoginPage = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const [error,setError]=useState("")

    const handleLogin=async (e)=>{
        e.preventDefault();
        try {
            const res=await axios.post("http://127.0.0.1:8000/api/token/",{
                email,
                password,
            })
        localStorage.setItem("access",res.data.access)
        localStorage.setItem("refresh",res.data.refresh)
        navigate("/dashboard")
        } catch (err) {
            setError("Invalid Email or Password")
        }
    }
  return (
    <div>
        <form action="" onSubmit={handleLogin}>
            <div>
                <label htmlFor="">Username:</label>
                <input 
                type="text"
                id="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                placeholder='Enter your Username' />
            </div>
            <div>
                <label htmlFor="">Email:</label>
                <input 
                type="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Enter your Email' />
            </div>
            <div>
                <label htmlFor="">Password:</label>
                <input 
                type="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Enter your Password' />
            </div>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage
