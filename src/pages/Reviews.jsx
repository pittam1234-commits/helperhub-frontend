import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Reviews() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  const [stars, setStars] = useState("5");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <div className="container">
        <h2>Booking Not Found</h2>
      </div>
    );
  }

  const submitReview = async (e) => {
    e.preventDefault();

    if (!review.trim()) {
      alert("Please enter review");
      return;
    }

    const ratingData = {
      stars: Number(stars),
      review: review,
      booking: {
        id: Number(booking.id),
      },
    };

    try {
      setLoading(true);

      await api.post("/ratings", ratingData);

      alert("Review Submitted Successfully");

      navigate("/my-bookings");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Review Submission Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Write Review</h1>

      <div className="booking-card">
        <h2>{booking.worker?.name}</h2>

        <p>
          <b>Category :</b> {booking.worker?.category}
        </p>

        <p>
          <b>Status :</b> {booking.status}
        </p>

        <form onSubmit={submitReview}>
          <label>
            <b>Rating</b>
          </label>

          <select
            value={stars}
            onChange={(e) => setStars(e.target.value)}
          >
            <option value="5">⭐⭐⭐⭐⭐ Very Good</option>
            <option value="4">⭐⭐⭐⭐ Good</option>
            <option value="3">⭐⭐⭐ Average</option>
            <option value="2">⭐⭐ Poor</option>
            <option value="1">⭐ Very Poor</option>
          </select>

          <br />
          <br />

          <label>
            <b>Review</b>
          </label>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            rows="5"
          />

          <br />
          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Reviews;