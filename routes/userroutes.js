const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/usermodel");
const userRouter = express.Router();
userRouter.post("/register", async (req, res) => {
  const { name, email, password, gender } = req.body;
  try {
    const hash = await bcrypt.hash(password, 5);
    const user = new UserModel({ name, email, gender, password: hash });
    await user.save();
    res.status(200).json({ msg: "user is registered" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user=await UserModel.find({email});
    if(user.length>0){
        bcrypt.compare(password,user[0].password,function(err,result){
            if(result){
                const token=jwt.sign({userId:user[0]._id,username:user[0].name},"masai");
                res.status(200).json({msg:"user is logged in",token:token})
            }else{
                res.status(200).json({msg:"wrong details"})
            }
        })
    }
  } catch (error) {
    res.status(400).json({msg:"something went wrong in the internet"})
  }
});

module.exports = {
  userRouter,
};
