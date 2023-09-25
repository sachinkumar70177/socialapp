const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PostModel } = require("../model/postmodel");
const { auth } = require("../middleware/auth");
const postRouter = express.Router();
postRouter.post("/add", auth,async (req, res) => {
  const payload = req.body;
  try {
   
    const post = new PostModel(payload);
    await post.save();
    res.status(200).json({ msg: "post is cretaed" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// get post
postRouter.get("/",auth,async(req,res)=>{
    const query=res.query.device;
    if(!query){
        try {
            const posts=await PostModel.find({username:req.body.username})
            if(posts){
                res.status(200).json({data:posts})
            }else{
                res.status(200).json({data:[]})
            }
           
        } catch (error) {
            res.status(400).json({msg:"error is " + error})
        }
    }else{
       const devices=query.split(",").map(el=>el.toUpperCase())
       try {
        const filterposts=await post.find({device:{$in:devices}})
        res.status(200).json(filterposts)
       } catch (error) {
        
       }
    }
   
})
// update


// login
postRouter.post("/update/:id",auth, async (req, res) => {

  try {
    const {id}=req.params;
    const {title,body,device}=req.body;
    const post=await PostModel.findById(id);
   if(!post){
    return res.status(404).json({msg:"post not found"})
   }
   if(post.username!==req.body.username){
    return res.status(403).json({msg:"you are not authorised"})
   }
   if(title){
    post.title=title
   }
   if(body){
    post.body=body
   }
   if(device){
    post.device=device
   }
   await post.save();
   res.status(200).json({msg:"post updated"})
  } catch (error) {
    res.status(400).json({msg:"something went wrong in the internet"})
  }
});

postRouter.delete("/delete/:id",auth,async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,body,device}=req.body;
        const post=await PostModel.findById(id);
       if(!post){
        return res.status(404).json({msg:"post not found"})
       }
       if(post.username!==req.body.username){
        return res.status(403).json({msg:"you are not authorised"})
       }
      await PostModel.findByIdAndDelete(id)
       res.status(200).json({msg:"post deleted"})
      } catch (error) {
        res.status(400).json({msg:"something went wrong in the internet"})
      }
})

module.exports = {
 postRouter ,
};
