import React from "react";
import CourseCard from "./CourseCard";

const CourseList = ({ courses }) => {
  if (!courses.length) {
    return <p className="text-center mt-4">No courses available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
