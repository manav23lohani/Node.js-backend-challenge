const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcyrpt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  if(password !== confirmPassword){
    res.status(400);
    throw new Error("Passwords do not match");
  }
  if (password.length < 5) {
    res.status(400);
    throw new Error("Minimum password length is 6");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  const hashedPassword = await bcyrpt.hash(password, 5);
  await User.create({
    email,
    firstName,
    lastName,
    password: hashedPassword,
  });
  res
    .status(201)
    .json({ message: "Registered successfully!" });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing user details");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found!, Please register first" });
  }
  if (await bcyrpt.compare(password, user.password)) {
    const accessToken = generateToken(user._id);
    res.status(200).json({
      token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Incorrect password!, try again");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    
    if (req.body.password) {
      const hashedNewPassword = await bcyrpt.hash(req.body.password, 5);
      user.password = hashedNewPassword;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully"
    });
  } 
  else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const viewProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.status(200).json({
      "Email address": user.email,
      "First Name": user.firstName,
      "Last Name": user.lastName
    });
  } 
  else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
module.exports = { registerUser, loginUser, updateProfile, viewProfile};