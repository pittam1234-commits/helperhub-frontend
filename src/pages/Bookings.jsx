import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Bookings() {
  const location = useLocation();
  const navigate = useNavigate();

  const worker = location.state?.worker;

  const [bookings, setBookings] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!worker) {
      loadBookings();
    }
  }, [worker]);

  const loadBookings = async () => {
    try {
      const response = await api.get("/bookings");

      const userBookings = response.data.filter(
        (booking) =>
          Number(booking.user?.id) === Number(userId)
      );

      setBookings(userBookings);
    } catch (error) {
      console.error("BOOKING LOAD ERROR:", error);

      setMessage(
        error.response?.data?.message ||
        "Failed to load bookings"
      );
    }
  };

  const createBooking = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!userId) {
      navigate("/login");
      return;
    }

    if (!worker?.id) {
      setMessage("Worker not found");
      return;
    }

    const bookingData = {
      user: {
        id: Number(userId)
      },
      worker: {
        id: Number(worker.id)
      },
      bookingDate,
      bookingTime,
      status: "PENDING"
    };

    try {
      setLoading(true);

      await api.post(
        "/bookings",
        bookingData
      );

      alert("Booking Successful");

      navigate("/bookings");
    } catch (error) {
      console.error("BOOKING ERROR:", error);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Booking Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (worker) {
    return (
      <div className="container">
        <h2>Book Worker</h2>

        <div className="worker-card">
          <h3>{worker.name}</h3>

          <p>Category: {worker.category}</p>
          <p>City: {worker.city}</p>
          <p>Price: ₹{worker.pricePerHour}</p>
        </div>

        <form onSubmit={createBooking}>
          <input
            type="date"
            value={bookingDate}
            onChange={(e) =>
              setBookingDate(e.target.value)
            }
            required
          />

          <input
            type="time"
            value={bookingTime}
            onChange={(e) =>
              setBookingTime(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Booking..."
              : "Confirm Booking"}
          </button>
        </form>

        {message && (
          <p style={{ color: "red" }}>
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            className="worker-card"
            key={booking.id}
          >
            <h3>{booking.worker?.name}</h3>

            <p>
              Category: {booking.worker?.category}
            </p>

            <p>
              City: {booking.worker?.city}
            </p>

            <p>
              Date: {booking.bookingDate}
            </p>

            <p>
              Time: {booking.bookingTime}
            </p>

            <p>
    Status:
    <strong
        style={{
            color:
                booking.status === "APPROVED"
                    ? "green"
                    : booking.status === "PENDING"
                    ? "orange"
                    : booking.status === "REJECTED"
                    ? "red"
                    : booking.status === "CANCELLED"
                    ? "gray"
                    : "black"
        }}
    >
        {" "}{booking.status}
    </strong>
</p>

            <p>
              Price: ₹{booking.worker?.pricePerHour}
            </p>

            {booking.status === "PENDING" && (
  <button
    type="button"
    style={{
      background: "red",
      marginRight: "10px"
    }}
onClick={async () => {
    if (!window.confirm("Cancel this booking?")) return;

    try {

        await api.put(`/bookings/${booking.id}/cancel`);

        alert("Booking Cancelled Successfully");

        loadBookings();

    } catch (error) {

        alert("Unable to cancel booking");

    }
}}
  >
    Cancel Booking
  </button>
)}

{booking.status === "APPROVED" && (
  <button
    type="button"
    onClick={() =>
      navigate("/payments", {
        state: {
          booking
        }
      })
    }
  >
    Pay Now
  </button>
)}

{booking.status === "COMPLETED" && (
  <button
    type="button"
    onClick={() =>
      navigate("/reviews", {
        state: {
          worker: booking.worker
        }
      })
    }
  >
    Write Review
  </button>
)}
          </div>
        ))
      )}
    </div>
  );
}

export default Bookings;