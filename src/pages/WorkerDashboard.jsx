import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function WorkerDashboard() {
  const navigate = useNavigate();

  const workerId =
    localStorage.getItem("workerId");

  const role =
    localStorage.getItem("role");

  const [worker, setWorker] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [earnings, setEarnings] = useState({
  todayEarnings: 0,
  monthEarnings: 0,
  completedJobs: 0,
  pendingJobs: 0,
});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "WORKER") {
      navigate("/worker/login");
      return;
    }

    if (!workerId) {
      alert("Worker ID not found");

      navigate("/worker/login");

      return;
    }

    loadDashboard();
    
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    

    try {
      const response = await api.get(
        `/workers/${workerId}`
      );

      setWorker(response.data);
    } catch (error) {
      console.error(
        "Worker Profile Error:",
        error.response?.status,
        error.response?.data
      );
    }

    try {
      const response = await api.get(
        `/bookings/worker/${workerId}`
      );

      setBookings(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Worker Bookings Error:",
        error.response?.status,
        error.response?.data
      );

      setBookings([]);
    }

    try {
      const response = await api.get(
        `/ratings/worker/${workerId}`
      );

      setReviews(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Worker Reviews Error:",
        error.response?.status,
        error.response?.data
      );

      setReviews([]);
    }

    setLoading(false);
  };

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.status === "PENDING"
  ).length;

  const completedBookings = bookings.filter(
    (booking) =>
      booking.status === "COMPLETED"
  ).length;

  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce(
          (total, review) =>
            total + review.stars,
          0
        ) / reviews.length;

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Worker Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>
        Welcome,{" "}
        {worker?.name ||
          localStorage.getItem("name")}
      </h1>

      <p>
        Worker Dashboard
      </p>

      <div className="dashboard-grid">
        <div
          className="dashboard-card"
          onClick={() =>
            navigate("/worker/profile")
          }
        >
          <h2>👤</h2>

          <h3>My Profile</h3>

          <p>
            {worker?.category || "Worker"}
          </p>
        </div>

        <div
          className="dashboard-card"
          onClick={() =>
            navigate("/worker/bookings")
          }
        >
          <h2>{bookings.length}</h2>

          <h3>Total Bookings</h3>
        </div>

        <div
          className="dashboard-card"
          onClick={() =>
            navigate("/worker/bookings")
          }
        >
          <h2>{pendingBookings}</h2>

          <h3>Pending Bookings</h3>
        </div>

        <div
          className="dashboard-card"
          onClick={() =>
            navigate("/worker/bookings")
          }
        >
          <h2>{completedBookings}</h2>

          <h3>Completed Jobs</h3>
        </div>

        <div
          className="dashboard-card"
          onClick={() =>
            navigate("/worker-reviews")
          }
        >
          <h2>
            ⭐ {averageRating.toFixed(1)}
          </h2>

          <h3>Average Rating</h3>

          <p>
            {reviews.length} Reviews
          </p>
        </div>
        <div className="dashboard-card">
  <h2>₹ {earnings.todayEarnings}</h2>
  <h3>Today's Earnings</h3>
</div>

<div className="dashboard-card">
  <h2>₹ {earnings.monthEarnings}</h2>
  <h3>This Month</h3>
</div>

<div className="dashboard-card">
  <h2>{earnings.completedJobs}</h2>
  <h3>Paid Jobs</h3>
</div>

<div className="dashboard-card">
  <h2>{earnings.pendingJobs}</h2>
  <h3>Approved Jobs</h3>
</div>
      </div>
    </div>
  );
}

export default WorkerDashboard;