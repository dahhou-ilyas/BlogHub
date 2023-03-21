import React from 'react'
import {formatISO9075} from 'date-fns'

function UserPost({titre,resume,content,image,createdAt,author}) {
  return (
    <div className="post">
        <div className='image'>
           <img src='https://www.pixelstalk.net/wp-content/uploads/images6/Anime-Boy-Wallpaper-Free-Download-768x432.jpg' alt=''/>
        </div>
        <div className='text'>
            <h2>{titre}</h2>
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