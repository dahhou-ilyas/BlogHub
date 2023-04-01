import { formatISO, formatISO9075 } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import  {Usercontext}  from '../Usercontext'

function PostPages() {
    
    const [postInfo,setPostInfo]=useState(null)

    const {userInfo}=useContext(Usercontext)
 
    const {id}=useParams();
    useEffect(()=>{
        fetch(`http://localhost:4000/post/${id}`)
        .then(response=>{
            response.json().then(postInfo=>{
              setPostInfo(postInfo)
            })
        })
    },[])
    if(!postInfo) return ''
    return (
      <div className='post-page'>
       <h1>{postInfo.titre}</h1>
       <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
       <div className='author'>by @{postInfo.author.username}</div>
      {userInfo.id===postInfo.author._id && (
        <div className='edit-row'>
          <Link className='edit-btn' to={`/edit/${postInfo._id}`}>Edit this post</Link>
        </div>
      )}
        <div className='image'>
          <img src={`http://localhost:4000/${postInfo.image}`}/>
        </div>
        
        <div className='contente' dangerouslySetInnerHTML={{__html:postInfo.content}}/>
      </div>
    )
}

export default PostPages