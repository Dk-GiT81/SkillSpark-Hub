const express = require("express");
const {
  authUser,
  registerUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authmiddleware");

const router = express.Router();

// POST /api/users/login → Login user
router.post("/login", authUser);

// POST /api/users/register → Register user
router.post("/register", registerUser);

// GET /api/users/profile → Get logged in user's profile (protected)
router.get("/profile", protect, getUserProfile);

module.exports = router;