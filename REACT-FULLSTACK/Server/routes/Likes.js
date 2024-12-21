const express = require("express");
const router = express.Router();
const { Likes } = require('../models'); // Correct
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/",validateToken,async(req,res) => {
    const {PostId} = req.body;
    const UserId = req.User.id;


    await Likes.create({PostId:PostId,UserId:UserId})
    res.json ("sucess")

})



module.exports = router;