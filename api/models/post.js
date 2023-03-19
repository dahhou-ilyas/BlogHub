const mongoose =require('mongoose')

const PsotSchema=new mongoose.Schema({
    titre:String,
    resume:String,
    content:String,
    image:String,
},{
    timestamps:true,
})

const PostModel=mongoose.model('Post',PsotSchema)

module.exports=PostModel