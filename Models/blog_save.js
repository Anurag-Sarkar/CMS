const mongoose = require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/blog")

const blogSchema = new mongoose.Schema({
    blog:String
})

module.exports = mongoose.model("blog",blogSchema)