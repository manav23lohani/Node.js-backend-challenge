const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const getPosts = asyncHandler(async (req, res) => {
  // console.log(req.user);
  const posts = await Post.find({ user_id: req.user.id });
  const user = await User.findById(req.user.id);
  const response = [...posts];
  res.status(200).json(response);
});

const createPost = asyncHandler(async (req, res) => {
  const {
    title,
    content,
  } = req.body;
  if (!title || !content) {
    res.status(400);
    throw new Error("Fill necessary details");
  }
  const post = await Post.create({
    title,
    content,
    creationDate: Date.now(),
    user_id: req.user.id
  });
  res.status(201).json(post);
});

const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post doesn't exists");
  }
  res.status(200).json(post);
});

module.exports = {
  getPosts,
  createPost,
  getPost,
};
