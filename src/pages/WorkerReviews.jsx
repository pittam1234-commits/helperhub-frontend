import { useLocation, useNavigate } from "react-router-dom";

function WorkerReviews() {
  const location = useLocation();
  const navigate = useNavigate();

  const worker = location.state?.worker;
  const reviews = location.state?.reviews || [];

  if (!worker) {
    return (
      <div className="container">
        <h2>Worker Reviews</h2>

        <p>No worker selected.</p>

        <button onClick={() => navigate("/workers")}>
          Back To Workers
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{worker.name} Reviews</h1>

      <div className="worker-card">
        <h2>{worker.name}</h2>

        <p>
          <b>Category :</b> {worker.category}
        </p>

        <p>
          <b>City :</b> {worker.city}
        </p>
      </div>

      <h2>Customer Reviews</h2>

      {reviews.length === 0 ? (
        <h3>No Reviews Yet</h3>
      ) : (
        reviews.map((rating) => (
          <div
            className="booking-card"
            key={rating.id}
          >
            <h3>
              {rating.user?.name || "Customer"}
            </h3>

            <p>
              <b>Rating :</b>{" "}
              {"⭐".repeat(rating.stars)}
            </p>

            <p>
              <b>Review :</b>{" "}
              {rating.review}
            </p>
          </div>
        ))
      )}

      <button
        type="button"
        onClick={() => navigate("/workers")}
      >
        Back To Workers
      </button>
    </div>
  );
}

export default WorkerReviews;