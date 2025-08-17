const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const enrollInCourse = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existing = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
    });

    return res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const getUserEnrollments = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const enrollments = await Enrollment
      .find({ user: req.user._id })
      .populate("course", "title description price");

    return res.json(enrollments);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { enrollInCourse, getUserEnrollments };
