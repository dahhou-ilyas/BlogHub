import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';
function CreerPostPage() {
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [file,setFile]=useState('')
    const [redirect,setRedirect]=useState(false)

    const modules = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]
    async function creerNouveauPost(e){
      const data=new FormData();
      data.set('title',title)
      data.set('summary',summary)
      data.set('content',content)
      data.set('file',file[0])
    //console.log(file[0]);
      e.preventDefault();
      const response=await fetch('https://bbblllllog.onrender.com/creerpost',{
        method: 'POST',
        body:data,
        credentials:'include',
      })
      if(response.ok){
        setRedirect(true)
      }

    }

    if(redirect){
      return <Navigate to={'/'}/>
    }
  return (
    <form onSubmit={creerNouveauPost}>
        <input type="text" placeholder='Title' 
          value={title} onChange={e=>setTitle(e.target.value)} />
        <input type="summary" placeholder='Summary' 
          value={summary} onChange={e=>setSummary(e.target.value)}/>
        <input type="file" onChange={e=>setFile(e.target.files)} />
        <ReactQuill value={content} 
          onChange={newValue=>setContent(newValue)} 
          modules={modules} 
          formats={formats} />
        <button className='Post'>add</button>
    </form>
  )
}

export default CreerPostPage