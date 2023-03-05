import './App.css';
import React,{ Component }  from 'react'
import {Route,Routes} from "react-router-dom"
import Post from './compenant/Post';
import Layout from './compenant/Layout';
import Login from './compenant/Login';
import Registre from './compenant/Registre';
import {UserContextProvide} from './Usercontext'
import CreerPost from './compenant/CreerPost';

function App() {
  return (
    <UserContextProvide>
      <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Post/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/registre'} element={<Registre/>}/>
        <Route path={'/create'} element={<CreerPost/>} />
      </Route>
    </Routes>
    </UserContextProvide>
    
  );
}

export default App;
