import React,{ Component }  from 'react'

function Post() {
  return (
    <div className="post">
        <div className='image'>
           <img src='https://www.pixelstalk.net/wp-content/uploads/images6/Anime-Boy-Wallpaper-Free-Download-768x432.jpg' alt=''/>
        </div>
        <div className='text'>
            <h2>socano is the great man</h2>
            <p className='info'>
              <a className='auteur'>Ilyas dahhou</a>
              <time>2023-2-26 16:45</time>
            </p> 
            <p className='resume'>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble</p>
        </div>
      </div>
  )
}

export default Post