import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

const handleEnroll = async () => {
  try {
    const token = localStorage.getItem("token"); // token saved on login
    if (!token) {
      alert("Please login to enroll in a course.");
      return;
    }

    await api.post(
      `/enrollments/${course._id}`,
      {}, // body is empty
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
      }
    );

    alert("Enrolled successfully!");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Failed to enroll.");
  }
};

  if (loading) return <p className="p-4">Loading...</p>;
  if (!course) return <p className="p-4">Course not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6 text-gray-700">{course.description}</p>

      <button
        onClick={handleEnroll}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Enroll Now
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default CourseDetails;
