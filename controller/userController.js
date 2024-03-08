const userCollection = require("../model/userSchema")
const bcrypt = require("bcrypt")

const userLogin = async (req,res)=>{
    console.log("here")
    try {
        const {userName,userPwd} = req.body;
        var data;
        await userCollection.findOne({userName:userName})
            .then((temp)=>{
                if(temp){
                    data=temp
                }
                })
            .catch((error)=>
                console.log(error))
        if(!data)
            return res.status(403).json({success:false,msg:"Username does not exists"})
        else
        {
            if(await bcrypt.compare(userPwd,data.userPwd))
            {
                return res.status(201).json({success:true,msg:{id:data._id,dateCreated:data.dateCreated}})
            }
            else
            {
                return res.status(402).json({success:false,msg:"Password not Matched"})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(404).send()
    }
}

const userSignup = async (req,res)=>{
    try {
        var datetime = new Date();
        const {userName,userPwd} = req.body;
        var data =false;
        const salt = await bcrypt.genSalt(3)
        const hashPwd = await bcrypt.hash(userPwd,salt)
        
        await userCollection.findOne({userName:userName})
            .then((res)=>{
                if(res){
                    console.log("res is " ,res)
                    data=true
                    }
                })
            .catch((error)=>
                console.log(error))
        if(data)
            return res.status(409).json({success:false,msg:"Username already exists"})
        else
            await userCollection.create({userName:userName,userPwd:hashPwd,dateCreated:datetime.toISOString().slice(0,10)})
        res.status(201).json({success:true,msg:"Account Created!"})
    } catch (error) {
        console.log(error)
        res.status(404).send({success:false,msg:error})
    }
}


const userPosts = async (req,res)=>{
    try {
        const {id} = req.params;
        await userCollection.findOne({_id:id})
            .then((data)=>{
                if(data){
                    return res.status(200).json({success:true,msg:data.dateCreated})
                }
                })
            .catch((error)=>
                console.log(error))
            

    } catch (error) {
        console.log(error)
        res.status(404).send({success:false,msg:error})
    } 
} 


module.exports = { 
    userLogin,
    userSignup,
    userPosts,
}

