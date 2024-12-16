const express = require('express');
const router = express.Router();
const { Posts } = require('../models'); // Import the Posts model (adjust model name if needed)

// GET route
router.get("/", async(req, res) => {
    const listOfPosts = await Posts.findAll(); // Get all posts using the Posts model
    res.json(listOfPosts); // Return the list of posts as a JSON response
});

// POST route
router.post("/", async (req, res) => {
    try {
        const post = req.body; // Get the request body data
        const newPost = await Posts.create(post); // Use the Posts model to create a new entry
        res.json(newPost); // Return the created post as a response
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" }); // Send error response
    }
});

module.exports = router;
