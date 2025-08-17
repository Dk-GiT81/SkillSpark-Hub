import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Fetch enrolled courses for this user
  useEffect(() => {
    const fetchEnrolled = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/enrollments/me", {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await res.json();
        setEnrolledCourses(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
        setLoading(false);
      }
    };

    if (user) fetchEnrolled();
  }, [user]);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">🎓 My Dashboard</h2>

      {enrolledCourses.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t enrolled in any course yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-gray-600">👨‍🏫 {course.instructor}</p>
              <p className="mt-2 text-gray-700 text-sm">{course.description}</p>
              <span className="inline-block mt-3 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                ✅ Enrolled
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
