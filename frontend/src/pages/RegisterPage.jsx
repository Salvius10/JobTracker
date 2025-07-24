import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const RegisterPage = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const [error,setError]=useState("")
    const handleRegister=async (e)=>{
        e.preventDefault()
        try {
            const res=await axios.post("http://127.0.0.1:8000/api/register/",{
            username,
            email,
            password,
        })
        navigate("/login")
        } catch (error) {
          setError("Registration Failed. Please Try Again.")  
        }
    }
  return (
    <div>
      <form action="" onSubmit={handleRegister}>
        <div>
            <label htmlFor="">Username:</label>
            <input 
            type="text"
            placeholder='Enter your Username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id='username' />
        </div>
        <div>
            <label htmlFor="">Email:</label>
            <input 
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id='email' />
        </div>
         <div>
            <label htmlFor="">Password:</label>
            <input 
            type="password"
            placeholder='Enter your Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
         </div>
         {error && <p>{error}</p>}
         <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
