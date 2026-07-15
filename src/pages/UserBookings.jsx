import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function UserBookings() {
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [reviewedBookings, setReviewedBookings] =
    useState({});

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await api.get(
        `/bookings/user/${userId}`
      );

      setBookings(response.data);

      await loadReviewStatus(response.data);
    } catch (error) {
      console.error(
        "Load Bookings Error:",
        error
      );

      alert("Unable to load bookings");
    }
  };

  const loadReviewStatus = async (bookingList) => {
    const reviewStatus = {};

    for (const booking of bookingList) {
      if (booking.status === "COMPLETED") {
        try {
          const response = await api.get(
            `/ratings/booking/${booking.id}/exists`
          );

          reviewStatus[booking.id] =
            response.data;
        } catch (error) {
          console.error(
            `Review Status Error ${booking.id}:`,
            error
          );

          reviewStatus[booking.id] = false;
        }
      }
    }

    setReviewedBookings(reviewStatus);
  };

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      await api.put(
        `/bookings/${id}/cancel`
      );

      alert(
        "Booking Cancelled Successfully"
      );

      await loadBookings();
    } catch (error) {
      console.error(
        "Cancel Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Cancel Failed"
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

    if (status === "CANCELLED") {
      return "gray";
    }

    if (status === "REJECTED") {
      return "red";
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
              <b>Worker :</b>{" "}
              {booking.worker?.name}
            </p>

            <p>
              <b>Category :</b>{" "}
              {booking.worker?.category}
            </p>

            <p>
              <b>Phone :</b>{" "}
              {booking.worker?.phone}
            </p>

            <p>
              <b>City :</b>{" "}
              {booking.worker?.city}
            </p>

            <p>
              <b>Date :</b>{" "}
              {booking.bookingDate}
            </p>

            <p>
              <b>Time :</b>{" "}
              {booking.bookingTime}
            </p>

            <p>
              <b>Status :</b>{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: getStatusColor(
                    booking.status
                  ),
                }}
              >
                {booking.status}
              </span>
            </p>

            {booking.status === "PENDING" && (
              <button
                type="button"
                className="btn-danger"
                onClick={() =>
                  cancelBooking(booking.id)
                }
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
                      booking: booking,
                    },
                  })
                }
              >
                Pay Now
              </button>
            )}

            {booking.status === "PAID" && (
              <button
                type="button"
                disabled
                style={{
                  backgroundColor: "green",
                  color: "white",
                  cursor: "not-allowed",
                }}
              >
                PAID
              </button>
            )}

            {booking.status === "COMPLETED" &&
              reviewedBookings[booking.id] ===
                false && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/reviews", {
                      state: {
                        worker: booking.worker,
                        booking: booking,
                      },
                    })
                  }
                >
                  Write Review
                </button>
              )}

            {booking.status === "COMPLETED" &&
              reviewedBookings[booking.id] ===
                true && (
                <button
                  type="button"
                  disabled
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    cursor: "not-allowed",
                  }}
                >
                  REVIEWED ⭐
                </button>
              )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserBookings;