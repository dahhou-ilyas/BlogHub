import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
function CreerPost() {
  return (
    <form>
        <input type="text" placeholder='Title'/>
        <input type="summary" placeholder='Summary'/>
        <input type="file" placeholder='Summary'/>
        <ReactQuill />
        <button className='Post'>add</button>
    </form>
  )
}

export default CreerPost