import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Function to update user state when localStorage changes
    const updateUser = () => {
      setUser(localStorage.getItem("token"));
    };

    // Listen for login/logout updates
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Interview Scheduler
        </Link>
        <div className="navbar-links">
          {user ? (
            <button className="navbar-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="navbar-btn login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
