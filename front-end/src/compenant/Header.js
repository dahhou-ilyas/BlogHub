import React ,{ Component } from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/registre">Register</Link>
        </nav>
    </header>
  )
}

export default Header