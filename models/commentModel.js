const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  commentText: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);