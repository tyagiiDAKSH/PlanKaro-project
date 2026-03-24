require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const adminRoutes = require("./routes/adminRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const vendorRoutes = require("./routes/vendorRoutes.js");
const eventRoutes = require("./routes/eventRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/vendor", vendorRoutes);
app.use("/event", eventRoutes);
app.use("/api", messageRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



