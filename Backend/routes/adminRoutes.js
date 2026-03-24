const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");


// Testing
router.get("/", (req, res) => {
  res.send("Admin route working 🚀");
});


// Register admin
router.post("/register", async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    await newAdmin.save();

    res.json({
      success: true,
      message: "Admin registered successfully"
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Error registering admin"
    });
  }
});

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