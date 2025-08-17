const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getCourses, createCourse, getCourseById } = require("../controllers/courseController");
const { protect } = require("../middleware/authmiddleware"); 
const { authorizeRoles } = require("../middleware/roleMiddleware");
const User = require("../models/userModel");


const router = express.Router();

// Public: Get all courses
router.get("/", getCourses);

// Protected: Only Admin/Instructor can create a course
router.post("/", protect, authorizeRoles("admin", "instructor"), createCourse);

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", getCourseById);

module.exports = router;
