const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Work.dakshtyagi@gmail.com",
    pass: "rwcytdxumrzuzepx"
  }
});

const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// POST: Save message
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    await transporter.sendMail({
  from: "Work.dakshtyagi@gmail.com",
  to: "Work.dakshtyagi@gmail.com",
  replyTo: email,
  subject: `Message from ${name}`,
  html: `
    <h3>New Message</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Message:</b> ${message}</p>
  `
});

    res.status(200).json({ success: true, message: "Message saved!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving message" });
  }
});

// GET: All messages (admin use)
router.get("/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;