const express = require("express");
const router = express.Router();
const { Posts,Likes } = require('../models'); // Correct
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/",validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({include: [Likes]});
  
  const likePosts = await Likes.findAll({where:{UserId:req.user.id}})
  
  
  res.json({listOfPosts:listOfPosts,likedPosts:likePosts});
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listofpost = await Posts.findAll({where:{UserId:id},include:[Likes],});
  res.json(listofpost);
});


router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username=req.user.username;
  post.UserId=req.user.id;
  await Posts.create(post);
  res.json(post);
});


router.delete("/:postId",validateToken, async(req,res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
})


module.exports = router;
