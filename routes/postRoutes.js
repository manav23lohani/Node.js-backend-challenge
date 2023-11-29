const express = require("express");
const router = express.Router();
const {getPosts,createPost,getPost} = require("../controllers/postController");
const userAuth = require("../middlewares/userAuth");

router.use(userAuth);

router.route("/").get(getPosts).post(createPost);

router.route("/:id").get(getPost);

module.exports = router;