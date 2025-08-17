const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new course
router.post("/", async (req, res) => {
  const { title, description, price, category } = req.body;
  const course = new Course({ title, description, price, category });
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE course by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, category, price },
      { new: true, runValidators: true } // returns updated doc & validates schema
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a course by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





module.exports = router;
