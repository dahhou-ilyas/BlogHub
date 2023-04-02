import React, { useState } from 'react'

function Registre() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    async function regist(e){
        e.preventDefault();
  
        const res=  await fetch('https://bbblllllog.onrender.com/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
          })
        if(res.status===200){
          alert("registration successful")
        }else{
          alert('user is alredy exist');
        }
    }
  return (
    <form className='register' onSubmit={regist}>
        <h1>Register</h1>
        <input type="text" placeholder='username' value={username}
         onChange={e=>setUsername(e.target.value)}/>
        <input type="password" placeholder='password' value={password}
        onChange={e=>setPassword(e.target.value)}/>
        <button>Register</button>
    </form>
  )
}

export default Registre