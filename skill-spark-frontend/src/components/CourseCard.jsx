import React, { useState } from "react";
import { enrollInCourse } from "../api/enrollmentApi";

const CourseCard = ({ course }) => {
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = async () => {
    try {
      await enrollInCourse(course._id);
      setEnrolled(true);
      alert("Enrolled successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error enrolling");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold">{course.title}</h2>
      <p className="text-gray-600">{course.description}</p>
      <p className="text-green-600 font-semibold mt-2">₹{course.price}</p>
      <button
        onClick={handleEnroll}
        disabled={enrolled}
        className={`mt-3 px-4 py-2 rounded-lg ${
          enrolled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white`}
      >
        {enrolled ? "Enrolled" : "Enroll Now"}
      </button>
    </div>
  );
};

export default CourseCard;
