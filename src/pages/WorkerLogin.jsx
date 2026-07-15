import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function WorkerLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginWorker = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

     const response = await api.post("/auth/login", {
    username: formData.email,
    password: formData.password
});

      console.log(
        "Worker Login Response:",
        response.data
      );

      if (response.data.role !== "WORKER") {
        alert("This account is not a worker account");
        return;
      }

      if (!response.data.workerId) {
        alert("Worker profile not found");
        return;
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "userId",
        response.data.userId
      );

      localStorage.setItem(
        "workerId",
        response.data.workerId
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

      localStorage.setItem(
        "email",
        response.data.email
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      alert("Worker Login Successful");

      navigate("/worker/dashboard");
    } catch (error) {
      console.error(
        "Worker Login Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Worker Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Worker Login</h2>

      <form onSubmit={loginWorker}>
        <input
          type="email"
          name="email"
          placeholder="Worker Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging In..."
            : "Worker Login"}
        </button>
      </form>

      <p>
        New Worker?{" "}
        <button
          type="button"
          onClick={() =>
            navigate("/worker/register")
          }
        >
          Register As Worker
        </button>
      </p>
    </div>
  );
}

export default WorkerLogin;