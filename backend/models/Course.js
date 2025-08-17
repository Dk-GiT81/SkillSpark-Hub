// import mongoose from "mongoose";
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructor: { type: String, required: true },
  enrolledStudents: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);

