import React, { useState } from 'react'

function Registre() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    async function regist(e){
        e.preventDefault();
        try{
          await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
          })
        }catch(e){
          alert("un fausse d'enregistrement");
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