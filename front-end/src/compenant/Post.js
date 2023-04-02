import React, { useEffect, useState } from 'react'
import UserPost from './UserPost';

function Post() {

  const [posts,setPosts]=useState([])
  useEffect(()=>{
    fetch('https://bbblllllog.onrender.com/post').then(resp=>{
      resp.json().then(posts=>{
        setPosts(posts)
      });
    })
     },[])
  return (
    <>
      {posts.length >0 && posts.map(post=>(
        <UserPost {...post}/>
        )) }
    </>
  )
}

export default Post