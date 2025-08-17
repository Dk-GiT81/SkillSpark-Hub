const express = require("express");
const { protect } = require("../middleware/authmiddleware");
const {
  enrollInCourse,
  getUserEnrollments,
} = require("../controllers/enrollmentController");

const router = express.Router();

// GET /api/enrollments/my → logged-in user's enrollments
router.get("/my", protect, getUserEnrollments);

// POST /api/enrollments/:courseId → enroll
router.post("/:courseId", protect, enrollInCourse);

module.exports = router;
