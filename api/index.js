const express=require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose');
const user=require('./models/user');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');

require('dotenv').config({path: __dirname + '/.env'})
//
const salt=bcrypt.genSaltSync(10);

//

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());



mongoose.connect(process.env.LOCALHOST).then(e=>console.log("succes")).catch(err=>console.log("err"))
// in 1:04:17 in vedeo
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
    console.log(userInfo);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const passOk=bcrypt.compareSync(password,userInfo.password)
    console.log(passOk);
    if(passOk){
        //login  
        jwt.sign({username,id:userInfo._id},process.env.KEY,(err,token)=>{
            if(err) throw err;
            console.log(token);
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
    const {token}=req.cookies;
    jwt.verify(token,process.env.KEY,{},(err,info)=>{
        if(err) throw err;
        console.log(info);
        res.json(info)
    })
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok');
})

app.listen(4000)