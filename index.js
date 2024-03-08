require('dotenv').config()
const express = require('express');
const app = express();

const body_parser = require("body-parser");
const userRouter = require('./route/userRouter')
const postRouter = require('./route/postRouter')
// require('dotenv').config()

const connectDB = require('./data/dbConnect')

const cors = require("cors");
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}));
app.use(cors()); 

app.use('',userRouter)
app.use('',postRouter)
app.get('/',(req,res)=>{
    res.send("Welcome to Thoughts backend!")
})
  
const serverStart = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to Database")
        app.listen(5001,()=>{
            console.log("Server started on 5001")
        })
        
    } catch (error) {
        console.log(error)
    }

}

serverStart()