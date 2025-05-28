const express = require("express");
const router = express.Router();
const Post = require("./models/Post");

router.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Błąd podczas pobierania postów" });
  }
});

router.post("/api/posts", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Błąd podczas tworzenia postu" });
  }
});

module.exports = router;
