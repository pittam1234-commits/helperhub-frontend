import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function AdminManagement() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.state?.tab || "users"
  );

  const [users, setUsers] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }

    loadData();
  }, [location.state?.tab]);

  const loadData = async () => {
    setLoading(true);

    try {
      const response = await api.get("/users");

      console.log("USERS:", response.data);

      setUsers(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Users Error:",
        error.response?.status,
        error.response?.data
      );

      setUsers([]);
    }

    try {
      const response = await api.get("/workers");

      console.log("WORKERS:", response.data);

      setWorkers(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Workers Error:",
        error.response?.status,
        error.response?.data
      );

      setWorkers([]);
    }

    try {
      const response = await api.get("/bookings");

      console.log("BOOKINGS:", response.data);

      setBookings(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Bookings Error:",
        error.response?.status,
        error.response?.data
      );

      setBookings([]);
    }

    try {
      const response = await api.get("/payments");

      console.log("PAYMENTS:", response.data);

      setPayments(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(
        "Payments Error:",
        error.response?.status,
        error.response?.data
      );

      setPayments([]);
    }

    setLoading(false);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) {
      return;
    }

    try {
      await api.delete(`/users/${id}`);

      alert("User Deleted Successfully");

      await loadData();
    } catch (error) {
      console.error(error);

      alert("Unable to delete user");
    }
  };

  const deleteWorker = async (id) => {
    if (!window.confirm("Delete this worker?")) {
      return;
    }

    try {
      await api.delete(`/workers/${id}`);

      alert("Worker Deleted Successfully");

      await loadData();
    } catch (error) {
      console.error(error);

      alert("Unable to delete worker");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) {
      return;
    }

    try {
      await api.delete(`/bookings/${id}`);

      alert("Booking Deleted Successfully");

      await loadData();
    } catch (error) {
      console.error(error);

      alert("Unable to delete booking");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Admin Data...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Admin Management</h1>

      <button
        type="button"
        onClick={() => navigate("/admin/dashboard")}
      >
        Back To Dashboard
      </button>

      <div className="admin-tabs">
        <button
          className={
            activeTab === "users"
              ? "active-tab"
              : ""
          }
          onClick={() => setActiveTab("users")}
        >
          Users ({users.length})
        </button>

        <button
          className={
            activeTab === "workers"
              ? "active-tab"
              : ""
          }
          onClick={() => setActiveTab("workers")}
        >
          Workers ({workers.length})
        </button>

        <button
          className={
            activeTab === "bookings"
              ? "active-tab"
              : ""
          }
          onClick={() => setActiveTab("bookings")}
        >
          Bookings ({bookings.length})
        </button>

        <button
          className={
            activeTab === "payments"
              ? "active-tab"
              : ""
          }
          onClick={() => setActiveTab("payments")}
        >
          Payments ({payments.length})
        </button>
      </div>

      {activeTab === "users" && (
        <div className="admin-table-container">
          <h2>Manage Users</h2>

          {users.length === 0 ? (
            <h3>No Users Found</h3>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>

                    <td>
                      {user.role === "ADMIN" ? (
                        <b>ADMIN</b>
                      ) : (
                        <button
                          className="btn-danger"
                          onClick={() =>
                            deleteUser(user.id)
                          }
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "workers" && (
        <div className="admin-table-container">
          <h2>Manage Workers</h2>

          {workers.length === 0 ? (
            <h3>No Workers Found</h3>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Experience</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.id}>
                    <td>{worker.id}</td>
                    <td>{worker.name}</td>
                    <td>{worker.category}</td>
                    <td>{worker.phone}</td>
                    <td>{worker.city}</td>
                    <td>
                      {worker.experience} Years
                    </td>
                    <td>
                      ₹{worker.pricePerHour}
                    </td>

                    <td>
                      <button
                        className="btn-danger"
                        onClick={() =>
                          deleteWorker(worker.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="admin-table-container">
          <h2>Manage Bookings</h2>

          {bookings.length === 0 ? (
            <h3>No Bookings Found</h3>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Worker</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>

                    <td>
                      {booking.user?.name ||
                        "No User"}
                    </td>

                    <td>
                      {booking.worker?.name ||
                        "No Worker"}
                    </td>

                    <td>{booking.bookingDate}</td>

                    <td>{booking.bookingTime}</td>

                    <td>
                      <b>{booking.status}</b>
                    </td>

                    <td>
                      <button
                        className="btn-danger"
                        onClick={() =>
                          deleteBooking(booking.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "payments" && (
        <div className="admin-table-container">
          <h2>Payment Details</h2>

          {payments.length === 0 ? (
            <h3>No Payments Found</h3>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Booking ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>

                    <td>
                      {payment.booking?.id ||
                        "N/A"}
                    </td>

                    <td>₹{payment.amount}</td>

                    <td>
                      {payment.paymentMethod}
                    </td>

                    <td>
                      <b>
                        {payment.paymentStatus}
                      </b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminManagement;