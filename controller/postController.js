const postCollection = require("../model/postSchema")
const mongoose = require('mongoose')


//send userID,postTitle,postText
const postCreate = async (req,res)=>{
    try {
        var postId = new mongoose.Types.ObjectId();
        let {userID,postTitle,postText} = req.body;

        var postdate = new Date().toISOString().slice(0,10)
        var postYear = postdate.slice(0,4)
        var postMonth = postdate.slice(6,7)
        var postDate = postdate.slice(8,10)
        var temp1 = new Date().toLocaleTimeString().split(':')
        var temp2 = temp1[0] + ":" + temp1[1] + " "
        postText = temp2 + postText
        var post = await postCollection.findOne({userID:userID,postDate:parseInt(postDate),postMonth:parseInt(postMonth),postYear:parseInt(postYear)})
        if(post) 
        {
            var oldPostText = post.postText;
            var oldPostID = post._id;
            var newPostText = oldPostText + "\n" + postText;

            await postCollection.findByIdAndUpdate({_id:oldPostID},{postText:newPostText,lastEdited:postDate})

        }
        else
            var postJson = {userID:userID,postTitle:postTitle,postText:postText, postID:postId,postYear:postYear,postMonth:postMonth-1,postDate:postDate};
            await postCollection.create(postJson)
        res.status(200).json({success:true})
    } catch (error) {
        console.log(error)
        res.status(400).json({success:false,msg:error})
    }
}
const postEdit = async (req,res)=>{
    var {postID} = req.params;
    var {userID,postText,postTitle} = req.body;
    try {
        var id = await postCollection.findOne({postID:postID});
        // console.log(id._id)
        await postCollection.findByIdAndUpdate({_id:id._id}, {postText:postText,postTitle:postTitle,lastEdited:new Date().toISOString().slice(0,10)})
        res.status(200).json({success:true})
    } catch (error) {
        console.log(error)
        res.status(404).json({success:false})
    }
}

//send postID ,userID to delete
const postDelete = async (req,res)=>{
    var {postID} = req.params;
    let msg =[]

    try {
        await postCollection.deleteOne({postID:postID}).then((res)=>msg.push(res)).catch((err)=>msg.push(err))
        res.status(200).json({success:true,msg:msg})
    } catch (error) {
        console.log(error)
        res.status(404).json({success:false,msg:msg})
    }
}
const postFetch = async (req,res)=>{
    var {postID} = req.params;
    try {
        await postCollection.find({postID:postID}).then((data)=>{
            res.status(200).json({success:true,msg:data})
        })
        .catch((err)=>console.log(err))
        // const authorisationFlag = tempPost[0].userID
        // if(authorisationFlag !=postJson.userID)
        // {
        //     msg.push("Authorisation Error")
        //     res.status(404).json({success:false,msg:msg})
        //     return
        // }

    } catch (error) {
        console.log(error)
        res.status(404).json({msg:error})
    }
}

const postsFetch = async (req,res)=>{ 
    var {year,month,userID} = req.params;
    try {
        const allPosts = await postCollection.find({userID:userID,postYear:parseInt(year),postMonth:parseInt(month)})
        res.status(200).json(allPosts)
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:error})
    }
}

const lastThreePosts = async (req,res)=>{
    var {userID} = req.params;
    let allPosts = []
    try{
        allPosts = await postCollection.find({userID:userID}).sort({
            postYear:-1,
            postMonth:-1,
            postDate:-1
        }).limit(3)
        res.status(200).json({success:true,msg:allPosts})
    }
    catch(err)
    {
        console.log(err)
        res.status(404).json({success:false,msg:err})
    }

}





module.exports = {
    postCreate,
    postEdit,
    postFetch,
    postDelete,
    postsFetch,
    lastThreePosts
}

