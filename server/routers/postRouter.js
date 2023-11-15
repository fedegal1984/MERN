const express = require("express")
const {getPosts, getPost, createPost, deletePost, updatePost} = require("../dao/controllers/postController")
const {authRequired} = require("../config/validateToken")

const postRouter = express.Router()

postRouter.get("/", authRequired, getPosts)
postRouter.get("/:id", authRequired, getPost)
postRouter.post("/", authRequired, createPost)
postRouter.delete("/:id", authRequired, deletePost)
postRouter.put("/:id", authRequired, updatePost)


module.exports = postRouter