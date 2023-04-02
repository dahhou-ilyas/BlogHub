import React ,{ Component, useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import  {Usercontext}  from '../Usercontext'

function Header() {
  const {setUserInfo,userInfo}=useContext(Usercontext)


  useEffect(() => {
      fetch('https://bbblllllog.onrender.com/profile', {
        credentials: 'include',
       }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      });
  }, []);
  console.log(userInfo);
  
   function logout(){
    fetch('https://bbblllllog.onrender.com/logout',{
      credentials:"include",
      method:'POST',
    })  
    setUserInfo(null)
   }
   console.log(userInfo);
   const username=userInfo;

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