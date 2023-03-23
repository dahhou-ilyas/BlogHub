import React from 'react'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

function UserPost({_id,titre,resume,content,image,createdAt,author}) {
  return (
    <div className="post">
        <div className='image'>
          <Link to={`post/${_id}`}>
           <img src={'http://localhost:4000/'+image} alt=''/>
           </Link>
        </div>
        <div className='text'>
            <Link to={`post/${_id}`}>
            <h2>{titre}</h2>
            </Link>
            <p className='info'>
              <a className='auteur'>{author.username}</a>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </p> 
            <p className='resume'>{resume}</p>
        </div>
      </div>
  )
}

export default UserPost