const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");



router.post("/",validateToken,async(requestAnimationFrame,res)=>{
    const{PostId} = requestAnimationFrame.body;
    const UserId= requestAnimationFrame.user.id;
    const found = await Likes.findOne({
       where: { PostId:PostId,UserId:UserId },
       });
       if(!found){
        await Likes.create({PostId:PostId,UserId:UserId});
        res.json("Liked The Post");
       }
       else{
        await Likes.destroy({
          where: {
            PostId:PostId,UserId:UserId
          },
        });
        res.json("UnLiked The Post");

       }
  

  
})


module.exports = router;