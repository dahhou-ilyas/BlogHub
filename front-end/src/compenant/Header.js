import React ,{ Component, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function Header() {
  const [username,setUsername]=useState('')

   useEffect(()=>{
      fetch('http://localhost:4000/profile',{
        credentials:'include',
      }).then((respon)=>{
        respon.json().then(dataUser=>{
          setUsername(dataUser.username);
        })  
      })
   },[])
  
   function logout(){
    fetch('http://localhost:4000/logout',{
      credentials:"include",
      method:'POST',
    })  
   }


  return (
    <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
          {username && (
            <>
            <Link to="/create">Creat new post</Link>
            <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
            <Link to="/login">Login</Link>
            <Link to="/registre">Register</Link>
            </>
          )}
        </nav>
    </header>
  )
}

export default Header