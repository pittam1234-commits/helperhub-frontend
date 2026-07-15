import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
  users: 0,
  workers: 0,
  bookings: 0,
  payments: 0,
  completedBookings: 0,
  pendingBookings: 0,
  totalRevenue: 0,
  todayRevenue: 0,
  monthlyRevenue: 0,
});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
  try {
    setLoading(true);

    const response = await api.get("/admin/dashboard");

    const data = response.data;

    setStats({
      users: data.totalUsers,
      workers: data.totalWorkers,
      bookings: data.totalBookings,
      payments: data.totalPayments,
      completedBookings: data.completedBookings,
      pendingBookings: data.pendingBookings,
      totalRevenue: data.totalRevenue,
      todayRevenue: data.todayRevenue,
      monthlyRevenue: data.monthlyRevenue,
    });
  } catch (error) {
    console.error(error);
    alert("Unable to load Admin Dashboard");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {loading ? (
        <h2>Loading Dashboard...</h2>
      ) : (
        <div className="dashboard-grid">

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/admin/manage", {
                state: {
                  tab: "users",
                },
              })
            }
          >
            <h2>{stats.users}</h2>
            <h3>Total Users</h3>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/admin/manage", {
                state: {
                  tab: "workers",
                },
              })
            }
          >
            <h2>{stats.workers}</h2>
            <h3>Total Workers</h3>
          </div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/admin/manage", {
                state: {
                  tab: "bookings",
                },
              })
            }
          >
            <h2>{stats.bookings}</h2>
            <h3>Total Bookings</h3>
          </div>
          <div className="dashboard-card">
  <h2>{stats.completedBookings}</h2>
  <h3>Completed Bookings</h3>
</div>

<div className="dashboard-card">
  <h2>{stats.pendingBookings}</h2>
  <h3>Pending Bookings</h3>
</div>

<div className="dashboard-card">
  <h2>₹{stats.totalRevenue}</h2>
  <h3>Total Revenue</h3>
</div>

<div className="dashboard-card">
  <h2>₹{stats.todayRevenue}</h2>
  <h3>Today's Revenue</h3>
</div>

<div className="dashboard-card">
  <h2>₹{stats.monthlyRevenue}</h2>
  <h3>Monthly Revenue</h3>
</div>

          <div
            className="dashboard-card"
            onClick={() =>
              navigate("/admin/manage", {
                state: {
                  tab: "payments",
                },
              })
            }
          >
            <h2>{stats.payments}</h2>
            <h3>Total Payments</h3>
          </div>

        </div>
      )}
    </div>
  );
}

export default AdminDashboard;