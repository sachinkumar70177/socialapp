const express=require("express")
const { connection } = require("./database")

const cors=require("cors")
const { userRouter } = require("./routes/userroutes")
const { postRouter } = require("./routes/postroutes")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cors());
app.get("/",(req,res)=>{
   
    res.send({msg:"hello from the app"})
})

app.use("/user",userRouter)
app.use("/posts",postRouter)
app.listen(3000,async()=>{
    try {
        await connection;
        console.log("db connected")
        console.log("serber connected")
    } catch (error) {
        console.log(error)
    }
})
