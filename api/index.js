const express=require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose');
const user=require('./models/user');
const PostModel=require('./models/post')
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const multer=require('multer')
const upload=multer({dest:'telecharge/'})
const cookieParser=require('cookie-parser');
const fs=require('fs')


require('dotenv').config({path: __dirname + '/.env'})
//
const salt=bcrypt.genSaltSync(10);

//

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/telecharge',express.static(__dirname+'/telecharge'))



mongoose.connect(process.env.LOCALHOST).then(e=>console.log("succes")).catch(err=>console.log("err"))

app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    try{
        let userInfo=await user.create({
            username,
            password:bcrypt.hashSync(password,salt),  
        })
        res.json(userInfo)
    }catch(e){
        res.status(400).json(e)
    }
    
})
app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const userInfo=await user.findOne({username:username});
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const passOk=bcrypt.compareSync(password,userInfo.password)
    console.log(passOk);
    if(passOk){
        //login  
        jwt.sign({username,id:userInfo._id},process.env.KEY,(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:userInfo._id,
                username,
            })
        })
        //res.json()
    }else{
        res.status(400).json('wrong')
    }
})
app.get('/profile',(req,res)=>{
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    const {token}=req.cookies;
    if(!token){
        res.json(false)
    }
    jwt.verify(token,process.env.KEY,{},(err,info)=>{
        if(err) throw err;
        res.json(info)
    })

})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/creerpost',upload.single('file'),async (req,res)=>{
    const {originalname,path}=req.file;

    // get extension de fichier
    const part=originalname.split(".");
    const ext=part[part.length-1]

    //ajouter extension de fichier
    const newpath=path+'.'+ext
    fs.renameSync(path,newpath)

    const {token}=req.cookies;
    jwt.verify(token,process.env.KEY,{},async (err,info)=>{
        if(err) throw err;
        
        const {title,summary,content}=req.body
    // add post to database
    const postDocument=await PostModel.create({
        titre:title,
        resume:summary,
        content:content,
        image:newpath,
        author:info.id,
    })
        res.json(postDocument)
    })

    
})

app.put('/post',upload.single('file'),async (req,res)=>{
    let newpath=null;
   if(req.file){
    const {originalname,path}=req.file;

    // get extension de fichier
    const part=originalname.split(".");
    const ext=part[part.length-1]

    //ajouter extension de fichier
    newpath=path+'.'+ext
    fs.renameSync(path,newpath)
   }
   const {id,title,resume,content}=req.body
   const {token}=req.cookies;
   const postDoc=await PostModel.findById(id)

    jwt.verify(token,process.env.KEY,{},async (err,info)=>{
        if(err) throw err;
        const isAuthor=JSON.stringify(postDoc.author)===JSON.stringify(info.id)
        if(!isAuthor) {
            return res.status(400).json('you are not the author')
        }
        await postDoc.update({titre:title,resume:resume,content:content,image:newpath ? newpath:postDoc.image})
        res.json(postDoc)
    })

})

        
    


app.get('/post',async (req,res)=>{
    res.json(await PostModel.find().populate("author",['username'])
    .sort({createdAt:-1}).limit(25))
})


app.get('/post/:id',async (req,res)=>{
    const {id}=req.params
    const singlepost=await PostModel.findById(id).populate('author')
    res.json(singlepost)

})


app.listen(4000)