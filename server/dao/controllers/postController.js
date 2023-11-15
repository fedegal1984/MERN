const Post = require("../models/postModel")


const getPosts = async (req, res) =>{
    const posts = await Post.find({user: req.user.id}).populate("user")
    res.json(posts)
}

const getPost = async (req, res) =>{
    const post = await Post.findById(req.params.id).populate("user")
    if(post){
        res.status(200).json(post)
    }else{
        res.status(404).json({error: "posteo no encontrado"})
    }
}

const createPost = async (req, res) =>{
    const {title, description, date, keywords} = req.body
    const newPost = new Post({title, description, date, keywords, user: req.user.id})
    const postGuardado = await newPost.save()
    res.json(postGuardado)
}

const deletePost = async (req, res) =>{
    const post = await Post.findByIdAndDelete(req.params.id)
    if(post){
        res.sendStatus(204)
    }else{
        res.status(404).json({error: "posteo no encontrado"})
    }
}

const updatePost = async (req, res) =>{
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(post){
        res.status(200).json(post)
    }else{
        res.status(404).json({error: "posteo no encontrado"})
    }
}

module.exports = {getPosts, getPost, createPost, deletePost, updatePost}