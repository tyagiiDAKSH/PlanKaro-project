const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// ================= CREATE EVENT =================
router.post("/create", async (req, res) => {
  try {
    const { type, date, guests, budget, location, requirements } = req.body;

    const newEvent = new Event({
      type,
      date,
      guests,
      budget,
      location,
      requirements,
      status:"Pending",
      vendorStatus:"Pending"
    });

    await newEvent.save();


    res.json({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating event" });
  }
});

// ================= GET ALL EVENTS =================
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// ================= APPROVE EVENT =================
router.put("/approve/:id", async (req, res) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, {
      status: "Approved"
    });

    res.json({ message: "Event approved" });
  } catch (err) {
    res.status(500).json({ message: "Error approving event" });
  }
});

// ================= DELETE EVENT =================
router.delete("/delete/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting event" });
  }
});



// VENDOR ACCEPT
router.put("/vendor/accept/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { vendorStatus: "Accepted" } }, // 🔥 better
      { new: true } // 🔥 updated data return karega
    );

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: "Error accepting event" });
  }
});

// VENDOR REJECT
router.put("/vendor/reject/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { vendorStatus: "Rejected" } },
      { new: true }
    );

    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: "Error rejecting event" });
  }
});

module.exports = router;