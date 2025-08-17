const Course = require("../models/Course");

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    // Populate instructor with user details (name, email, role)
    const courses = await Course.find().populate("instructor", "name email role");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Admin/Instructor)
const createCourse = async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const course = new Course({
      title,
      description,
      instructor: req.user.id, // will store ObjectId of logged-in user
      price
    });
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email role");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getCourses, createCourse, getCourseById };
