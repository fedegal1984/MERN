const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    keywords:{type: String},
    user:{type: mongoose.Schema.Types.ObjectId, ref: "user", required: true}
})

const Post = mongoose.model("post", PostSchema)

module.exports = Post