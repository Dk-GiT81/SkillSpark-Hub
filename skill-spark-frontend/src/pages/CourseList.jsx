import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CourseList() {
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-3">{course.description}</p>
              <Link
                to={`/courses/${course._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
