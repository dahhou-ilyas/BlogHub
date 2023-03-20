import React from 'react'

function UserPost({title,resume,content,image}) {
  return (
    <div className="post">
        <div className='image'>
           <img src='https://www.pixelstalk.net/wp-content/uploads/images6/Anime-Boy-Wallpaper-Free-Download-768x432.jpg' alt=''/>
        </div>
        <div className='text'>
            <h2>{title}</h2>
            <p className='info'>
              <a className='auteur'>Ilyas dahhou</a>
              <time>2023-2-26 16:45</time>
            </p> 
            <p className='resume'>{resume}</p>
        </div>
      </div>
  )
}

export default UserPost