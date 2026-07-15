import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <section className="hero">

  <div className="hero-left">

    <span className="badge">
      ⭐ Trusted Home Services
    </span>

    <h1>
      Find Skilled Professionals
      <br />
      Near Your Home
    </h1>

    <p>
      Book verified electricians, plumbers,
      carpenters, painters, cleaners and
      many more professionals in minutes.
    </p>

    <div className="hero-buttons">

      <button onClick={() => navigate("/workers")}>
        🔍 Find Workers
      </button>

      <button
        className="secondary-btn"
        onClick={() => navigate("/worker/register")}
      >
        Become a Worker
      </button>

    </div>

    <div className="hero-stats">

      <div>
        <h2>10K+</h2>
        <span>Customers</span>
      </div>

      <div>
        <h2>5K+</h2>
        <span>Workers</span>
      </div>

      <div>
        <h2>20+</h2>
        <span>Categories</span>
      </div>

    </div>

  </div>

  <div className="hero-right">

    <div className="worker-card-preview">

      <img
        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500"
        alt="Worker"
      />

      <h3>Verified Professionals</h3>

      <p>
        Electrician • Plumber • Carpenter
      </p>

      <button>
        Book Now
      </button>

    </div>

  </div>

</section>

      <section className="stats">

        <div className="stat-card">
          <h2>10,000+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-card">
          <h2>5,000+</h2>
          <p>Verified Workers</p>
        </div>

        <div className="stat-card">
          <h2>20+</h2>
          <p>Service Categories</p>
        </div>

        <div className="stat-card">
          <h2>4.9 ★</h2>
          <p>Average Rating</p>
        </div>

      </section>

      <section className="services">

        <h2>Popular Services</h2>

        <div className="service-grid">

          <div className="service-card">
            ⚡
            <h3>Electrician</h3>
          </div>

          <div className="service-card">
            🚰
            <h3>Plumber</h3>
          </div>

          <div className="service-card">
            🪚
            <h3>Carpenter</h3>
          </div>

          <div className="service-card">
            🎨
            <h3>Painter</h3>
          </div>

          <div className="service-card">
            🧹
            <h3>Cleaner</h3>
          </div>

          <div className="service-card">
            ❄️
            <h3>AC Repair</h3>
          </div>

        </div>

      </section>

      <section className="why">

        <h2>Why Choose HelperHub?</h2>

        <div className="why-grid">

          <div>✔ Verified Workers</div>

          <div>✔ Secure Payments</div>

          <div>✔ Instant Booking</div>

          <div>✔ Affordable Pricing</div>

          <div>✔ Customer Support</div>

          <div>✔ Trusted Reviews</div>

        </div>

      </section>

    </>
  );
}

export default Home;