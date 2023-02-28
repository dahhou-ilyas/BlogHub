const express=require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose');
const user=require('./models/user');
var bcrypt = require('bcryptjs');
require('dotenv').config({path: __dirname + '/.env'})
//
const salt=bcrypt.genSaltSync(10);
//

app.use(cors());
app.use(express.json());
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
app.post('/login',(req,res)=>{
    const {username,password}=req.body;
})

app.listen(4000)