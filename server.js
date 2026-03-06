const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// Port
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Make uploads folder public
app.use("/uploads", express.static("uploads"));

// MongoDB connection
const uri = process.env.ATLAS_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Routes
const users = require("./routes/user");
app.use("/users", users);

// Production setup (serve React build)
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "client", "build");

  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
