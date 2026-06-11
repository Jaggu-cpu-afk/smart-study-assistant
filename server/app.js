const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const aiRoutes = require("./routes/aiRoutes");

const protect = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
res.send("API Running Successfully 🚀");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// PDF Routes
app.use("/api/pdf", pdfRoutes);

// AI Routes
app.use("/api/ai", aiRoutes);

// Protected Route
app.get("/api/profile", protect, (req, res) => {
res.json({
success: true,
message: "Protected Route Accessed",
user: req.user
});
});

const dashboardRoutes =
  require("./routes/dashboardRoutes");

app.use(
  "/api/dashboard",
  dashboardRoutes
);

module.exports = app;