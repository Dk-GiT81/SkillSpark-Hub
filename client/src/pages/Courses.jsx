import React, { useEffect, useState } from "react";
import AddCourseForm from "../components/AddCourseForm";
import { motion } from "framer-motion";
import axios from "axios";
import CourseList from "../components/CourseList";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseAdded = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  return (
    <div className="p-8">

      {/* Add course form */}
      <AddCourseForm onCourseAdded={handleCourseAdded} />

      {/* Single source of truth for displaying courses */}
      <CourseList courses={courses} />
    </div>
  );
};

export default Courses;
