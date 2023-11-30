const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

const createComment = asyncHandler(async(req, res)=>{
    const {
        postId,
        commentText,
      } = req.body;
      if (!postId || !commentText) {
        res.status(400);
        throw new Error("Fill necessary details");
      }
      const comment = await Comment.create({
        postId,
        userId: req.user.id,
        commentText
      });
      const post = await Post.findById(postId);
      post.comments.push(comment._id);
      await post.save();
      
      res.status(201).json(comment);
});
module.exports = {createComment};