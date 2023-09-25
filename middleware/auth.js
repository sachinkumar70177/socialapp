const jwt=require("jsonwebtoken")
const auth=(req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userId=decoded.userId;
                req.body.username=decoded.username;
                next()
            }
        })
    }else{
        res.status(400).json({msg:"you not authorised"})
    }
}

module.exports={
    auth,
}