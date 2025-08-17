import React, { useEffect, useState } from "react";
import { getMyEnrollments } from "../api/enrollmentApi";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getMyEnrollments();
        setCourses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Learning</h1>
      {courses.length === 0 ? (
        <p>No enrolled courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((enrollment) => (
            <div key={enrollment._id} className="border rounded-xl p-4 shadow-md bg-white">
              <h2 className="text-xl font-bold">{enrollment.course.title}</h2>
              <p className="text-gray-600">{enrollment.course.description}</p>
              <p className="text-green-600 font-semibold mt-2">
                ₹{enrollment.course.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
