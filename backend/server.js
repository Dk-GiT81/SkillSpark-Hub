const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Import routes
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Global Error Handling (optional but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
