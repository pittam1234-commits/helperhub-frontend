import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      setLoading(true);
const response = await api.post("/auth/login", {
    username: email,
    password
});

      console.log("ADMIN LOGIN RESPONSE:", response.data);
      console.log("ROLE:", response.data.role);

      const userRole = String(
        response.data.role || ""
      )
        .trim()
        .toUpperCase();

      console.log("NORMALIZED ROLE:", userRole);

      if (userRole !== "ADMIN") {
        localStorage.clear();

        setMessage(
          `Access Denied. Role received: ${userRole || "EMPTY"}`
        );

        return;
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "userId",
        String(response.data.userId)
      );

      localStorage.setItem(
        "role",
        userRole
      );

      localStorage.setItem(
        "name",
        response.data.name || ""
      );

      console.log(
        "SAVED ROLE:",
        localStorage.getItem("role")
      );

      alert("Admin Login Successful");

      navigate("/admin");

      window.location.reload();

    } catch (error) {
      console.error(
        "ADMIN LOGIN ERROR:",
        error
      );

      setMessage(
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Admin Login Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>

      <form onSubmit={handleAdminLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Admin Login"}
        </button>
      </form>

      {message && (
        <p className="error-message">
          {message}
        </p>
      )}
    </div>
  );
}

export default AdminLogin;