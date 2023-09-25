const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
  
    title:String,
    body:String,
    device:String,
    username:String,
    userId:String,
})
const PostModel=mongoose.model("posts",postSchema)

module.exports={
    PostModel,
}


//  /*
// {

//     "title":"pc lelo",
// "body":"pc body",
//     "device":"PC"
  
 

// }
// /*
