import React from "react";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 hover:scale-105 transition-transform cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-700 mb-2">{course.description}</p>
      <p className="text-gray-700 mb-4">Price: ${course.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Enroll Now
      </button>
    </motion.div>
  );
};

export default CourseCard;
