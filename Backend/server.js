const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

// DB connect
mongoose.connect("mongodb+srv://dakshtyagi533_db_user:Tyagi533ji@cluster0.px81j0l.mongodb.net/evendDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const eventRoutes = require("./routes/eventRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/vendor", vendorRoutes);
app.use("/event", eventRoutes);
app.use("/api", messageRoutes);

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});



