const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Signup
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) {
    return res.json({
      success: false,
      message: "User already exists"
    });
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.json({
    success: true,
    message: "User registered successfully"
  });
});


// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.json({
      success: false,
      message: "Invalid credentials"
    });
  }

  res.json({
    success: true,
    message: "Login successful",
    user
  });
});

// ✅ GET all users (Admin dashboard ke liye)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;