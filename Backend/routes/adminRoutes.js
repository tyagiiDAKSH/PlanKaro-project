const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, password });

  if (!admin) {
    return res.json({
      success: false,
      message: "Invalid admin credentials"
    });
  }

  res.json({
    success: true,
    message: "Login successful"
  });
});

module.exports = router;