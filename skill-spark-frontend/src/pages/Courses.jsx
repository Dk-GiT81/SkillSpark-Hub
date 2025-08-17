import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { enrollInCourse } from "../api/enrollmentApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Handle enrollment
  const handleEnroll = async (courseId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/enrollments/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`, // send JWT
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("✅ " + data.message);
        // mark enrolled course in UI
        setCourses((prev) =>
          prev.map((c) =>
            c._id === courseId ? { ...c, enrolled: true } : c
          )
        );
      } else {
        alert("⚠️ " + data.message);
      }
    } catch (err) {
      console.error("Error enrolling:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading courses...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Course Catalog</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-gray-600">👨‍🏫 {course.instructor}</p>
            <p className="mt-2 text-gray-700 text-sm">{course.description}</p>

            <button
              onClick={() => handleEnroll(course._id)}
              disabled={course.enrolled}
              className={`mt-4 w-full py-2 px-4 rounded-xl text-white ${
                course.enrolled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {course.enrolled ? "✅ Enrolled" : "Enroll"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
