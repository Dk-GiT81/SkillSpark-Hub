// server.js (CommonJS)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const Course = require("./models/Course");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("SkillSpark Backend is running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

  mongoose.connection.once("open", async () => {
  const count = await Course.countDocuments();
  if (count === 0) {
    await Course.insertMany([
      { title: "React for Beginners", description: "Learn React from scratch", price: 49.99, category: "Web Development" },
      { title: "Node.js Mastery", description: "Backend development with Node.js", price: 59.99, category: "Backend" }
    ]);
    console.log("Sample courses inserted");
  }
});