import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        SkillSpark
      </Link>

      {/* Links */}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/courses" className="hover:text-gray-200">Courses</Link>
        {user && <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>}
        {user && <Link to="/my-courses" className="hover:text-gray-200">My Courses</Link>}
      </div>

      {/* Auth Buttons */}
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-green-500 px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
