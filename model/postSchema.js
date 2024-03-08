const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userID: mongoose.Types.ObjectId,
    postID:mongoose.Types.ObjectId,
    postYear:Number,
    postMonth:Number,
    postDate:Number,
    postTitle:String,
    postText:String,
    lastEdited:{type:String,default:null},

},{
    collection:'postCollection'
})


module.exports = mongoose.model('postCollection',postSchema)