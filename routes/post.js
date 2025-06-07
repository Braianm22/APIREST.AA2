const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});
router.get('/:Postid', async (req, res) => {
    try {
        const post = await Post.findById(req.params.Postid);
        res.json(post);
    } catch (error) {
        res.json({ message: 'error' });
    }
}
);  
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json({ message: 'Error :(' });
  }
});
module.exports = router;
router.patch('/:Postid', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.Postid },
      { $set: { title: req.body.title, description: req.body.description } }
    );
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: 'Error updating post' });
  }
});
router.delete('/:Postid', async (req, res) => {
  try {
    const removedPost = await Post.findbyidanddelete(req.params.Postid);
    if (!removedPost) {
      return res.json({ message: 'Post not found' });
    }
    res.json(removedPost);
  } catch (error) {
    res.json({ message: 'Error deleting post' });
  }
});
