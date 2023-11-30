const express = require("express");
const router = express.Router();
const {createComment} = require("../controllers/commentController");
const userAuth = require("../middlewares/userAuth");

router.use(userAuth);

router.route("/addcomment").post(createComment);

module.exports = router;