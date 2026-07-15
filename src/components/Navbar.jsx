import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (

    <nav className="navbar">

      <div className="logo">

        🛠️ HelperHub

      </div>

      <div className="nav-links">

        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/workers">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </>
        )}

        {token && role === "USER" && (
          <>
            <Link to="/workers">Workers</Link>
            <Link to="/my-bookings">My Bookings</Link>
            <Link to="/payments">Payments</Link>
            <Link to="/reviews">Reviews</Link>
          </>
        )}

        {token && role === "WORKER" && (
          <>
            <Link to="/worker/dashboard">
              Dashboard
            </Link>

            <Link to="/worker/bookings">
              Bookings
            </Link>

            <Link to="/worker/profile">
              Profile
            </Link>
          </>
        )}

        {token && role === "ADMIN" && (
          <>
            <Link to="/admin">
              Dashboard
            </Link>

            <Link to="/admin/users">
              Users
            </Link>

            <Link to="/admin/workers">
              Workers
            </Link>

            <Link to="/admin/bookings">
              Bookings
            </Link>
          </>
        )}

        {!token ? (
          <>

            <Link className="login-btn" to="/login">
              Login
            </Link>

            <Link className="register-btn" to="/register">
              Register
            </Link>

          </>
        ) : (
          <>

            <span className="welcome-user">

              👋 {name}

            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </>
        )}

      </div>

    </nav>

  );

}

export default Navbar;