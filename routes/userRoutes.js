const express = require("express");
const router = express.Router();
const {registerUser, loginUser, updateProfile, viewProfile} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

router.post("/signup",registerUser);
router.post("/login",loginUser);
router.post("/updateprofile", userAuth, updateProfile);
router.get("/viewprofile", userAuth, viewProfile);

module.exports = router;
