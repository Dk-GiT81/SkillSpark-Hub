import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Automatically attach JWT token
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// Enroll in a course
export const enrollInCourse = (courseId) => API.post(`/enrollments/${courseId}`);

// Get my enrolled courses
export const getMyEnrollments = () => API.get("/enrollments/my");
