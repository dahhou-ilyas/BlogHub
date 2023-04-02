import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom';
import { Usercontext } from '../Usercontext';




function Login() {
  
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false)
  const {setUserInfo}=useContext(Usercontext)

  async function log(e){
    e.preventDefault();
    const res=await fetch('https://bbblllllog.onrender.com/login',{
      method:'POST',
      body:JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
      credentials:'include',
    })
    if(res.ok){
      res.json().then((userInfo)=>{
        setUserInfo(userInfo)
        setRedirect(true)
      })
      
    }else{
      alert("not defined")
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <form action='#' className='login' onSubmit={log}>
        <h1>Login</h1>
        <input type="text" placeholder='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        <button>Login</button>
    </form>
  );
}

export default Login