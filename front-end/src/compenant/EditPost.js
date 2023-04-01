import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom';

function EditPost() {
    const {id}=useParams();

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

      useEffect(()=>{
        fetch('http://localhost:4000/post/'+id)
        .then(response => {
            response.json().then(postInfo =>{
                setTitle(postInfo.titre)
                setContent(postInfo.content)
                setSummary(postInfo.resume)
            })
        })
      },[])

    async function updatePost(e){
        e.preventDefault()
        const data =new FormData();
        data.set('title',title)
      data.set('summary',summary)
      data.set('content',content)
      data.set('id',id)
      data.set('file',file[0])
      

        const response=await fetch('http://localhost:4000/post',{
            method:'PUT',
            body:data,
            credentials:'include'
        })
        if(response.ok){
            setRedirect(true)
        }
        

    }

    if(redirect){
        return <Navigate to={'/post/'+id}/>
      }
    return (
      <form onSubmit={updatePost}>
          <input type="text" placeholder='Title' 
            value={title} onChange={e=>setTitle(e.target.value)} />
          <input type="summary" placeholder='Summary' 
            value={summary} onChange={e=>setSummary(e.target.value)}/>
          <input type="file" onChange={e=>setFile(e.target.files)} />
          <ReactQuill value={content} 
            onChange={newValue=>setContent(newValue)} 
            modules={modules} 
            theme={'snow'}
            formats={formats} />
          <button className='Post'>Update post</button>
      </form>
    )
}

export default EditPost