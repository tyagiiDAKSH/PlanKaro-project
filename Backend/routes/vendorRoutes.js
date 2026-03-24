console.log("vendor");

const express = require("express");
const router = express.Router();
const Vendor = require("../models/vendor");
const Event = require("../models/event"); // path check kar lena

// ✅ Vendor Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const vendor = await Vendor.findOne({ email, password });

  if (!vendor) {
    return res.json({
    success: false,
    message: "Invalid credentials"
});
  }

  res.json({
    success: true,
    message: "Login successful",
    vendor
  });
});

// ✅ Vendor Signup
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await Vendor.findOne({ email });
  if (exist) {
    return res.json({
    success: false,
    message: "Vendor already exists"
});
  }

  const newVendor = new Vendor({ name, email, password });
  await newVendor.save();

  res.json({
    success: true,
    message: "Vendor registered successfully"
});
});

router.get("/test", (req, res) => {
  res.send("Vendor route working");
});


router.get("/", async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
});

router.get("/events", async (req, res) => {
  try {
    const events = await Event.find({ status: "Approved" });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});



module.exports = router;