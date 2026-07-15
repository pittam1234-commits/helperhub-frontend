import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function WorkerBookings() {
  const workerId = localStorage.getItem("workerId");

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await api.get(
        `/bookings/worker/${workerId}`
      );

      setBookings(response.data);
    } catch (error) {
      console.error(
        "Load Bookings Error:",
        error
      );

      alert("Unable to load bookings");
    }
  };

  const approveBooking = async (id) => {
    try {
      await api.put(
        `/bookings/${id}/approve`
      );

      alert("Booking Approved Successfully");

      await loadBookings();
    } catch (error) {
      console.error(error);

      alert("Approve Failed");
    }
  };

  const rejectBooking = async (id) => {
    try {
      await api.put(
        `/bookings/${id}/reject`
      );

      alert("Booking Rejected Successfully");

      await loadBookings();
    } catch (error) {
      console.error(error);

      alert("Reject Failed");
    }
  };

  const completeBooking = async (id) => {
    const confirmComplete = window.confirm(
      "Mark this job as completed?"
    );

    if (!confirmComplete) {
      return;
    }

    try {
      await api.put(
        `/bookings/${id}/complete`
      );

      alert("Job Completed Successfully");

      await loadBookings();
    } catch (error) {
      console.error(
        "Complete Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to complete job"
      );
    }
  };

  const getStatusColor = (status) => {
    if (status === "APPROVED") {
      return "green";
    }

    if (status === "PAID") {
      return "green";
    }

    if (status === "COMPLETED") {
      return "blue";
    }

    if (status === "REJECTED") {
      return "red";
    }

    if (status === "CANCELLED") {
      return "gray";
    }

    return "orange";
  };

  return (
    <div className="container">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <h3>No Bookings Found</h3>
      ) : (
        bookings.map((booking) => (
          <div
            className="booking-card"
            key={booking.id}
          >
            <h2>
              Booking #{booking.id}
            </h2>

            <p>
              <b>Customer :</b>{" "}
              {booking.user?.name}
            </p>

            <p>
              <b>Email :</b>{" "}
              {booking.user?.email}
            </p>

            <p>
              <b>Phone :</b>{" "}
              {booking.user?.phone}
            </p>

            <p>
              <b>Booking Date :</b>{" "}
              {booking.bookingDate}
            </p>

            <p>
              <b>Booking Time :</b>{" "}
              {booking.bookingTime}
            </p>

            <p>
              <b>Status :</b>{" "}
              <span
                style={{
                  color: getStatusColor(
                    booking.status
                  ),
                  fontWeight: "bold",
                }}
              >
                {booking.status}
              </span>
            </p>

            {booking.status === "PENDING" && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    approveBooking(booking.id)
                  }
                >
                  Approve
                </button>

                <button
                  type="button"
                  className="btn-danger"
                  onClick={() =>
                    rejectBooking(booking.id)
                  }
                >
                  Reject
                </button>
              </>
            )}

            {booking.status === "PAID" && (
              <button
                type="button"
                onClick={() =>
                  completeBooking(booking.id)
                }
              >
                Complete Job
              </button>
            )}

            {booking.status ===
              "COMPLETED" && (
              <button
                type="button"
                disabled
                style={{
                  backgroundColor: "green",
                  color: "white",
                  cursor: "not-allowed",
                }}
              >
                COMPLETED
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default WorkerBookings;