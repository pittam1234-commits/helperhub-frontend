import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axiosConfig";

function Payments() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <div className="container">
        <h2>Payment</h2>
        <p>No booking selected for payment.</p>

        <button onClick={() => navigate("/my-bookings")}>
          Go To My Bookings
        </button>
      </div>
    );
  }

  const amount = booking.worker?.pricePerHour || 0;

  const makePayment = async () => {
    try {
      setLoading(true);

      const paymentData = {
        bookingId: booking.id,
        amount: amount,
        paymentMethod: paymentMethod,
      };

      const response = await api.post(
        "/payments",
        paymentData
      );

      console.log(response.data);

      alert("Payment Successful");

      navigate("/my-bookings");

    } catch (error) {
      console.error("Payment Error:", error);
      console.error(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Payment Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h1>Payment</h1>

      <div className="booking-card">

        <h2>Booking #{booking.id}</h2>

        <p>
          <b>Worker :</b> {booking.worker?.name}
        </p>

        <p>
          <b>Category :</b> {booking.worker?.category}
        </p>

        <p>
          <b>Booking Date :</b> {booking.bookingDate}
        </p>

        <p>
          <b>Booking Time :</b> {booking.bookingTime}
        </p>

        <p>
          <b>Amount :</b> ₹{amount}
        </p>

        <label>
          <b>Payment Method</b>
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
        >
          <option value="UPI">UPI</option>
          <option value="CARD">Card</option>
          <option value="CASH">Cash</option>
        </select>

        <br />
        <br />

        <button
          onClick={makePayment}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : `Pay ₹${amount}`}
        </button>

      </div>

    </div>
  );
}

export default Payments;