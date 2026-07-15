import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredWorkers, setFilteredWorkers] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [city, setCity] = useState("All");
const [maxPrice, setMaxPrice] = useState("");
const [minExperience, setMinExperience] = useState("");
const [sortBy, setSortBy] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    try {
      const response = await api.get("/workers");

      setWorkers(response.data);
      setFilteredWorkers(response.data);

      await loadRatings(response.data);

      setError("");
    } catch (error) {
      console.error("Workers Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load workers"
      );
    } finally {
      setLoading(false);
    }
  };
  const applyFilters = (
  searchValue = search,
  categoryValue = category,
  cityValue = city,
  priceValue = maxPrice,
  experienceValue = minExperience,
  sortValue = sortBy
) => {

  let data = [...workers];

  if (searchValue.trim() !== "") {
    data = data.filter(worker =>
      worker.name
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  }

  if (categoryValue !== "All") {
    data = data.filter(worker =>
      worker.category === categoryValue
    );
  }

  if (cityValue !== "All") {
    data = data.filter(worker =>
      worker.city === cityValue
    );
  }

  if (priceValue !== "") {
    data = data.filter(worker =>
      worker.pricePerHour <= Number(priceValue)
    );
  }

  if (experienceValue !== "") {
    data = data.filter(worker =>
      worker.experience >= Number(experienceValue)
    );
  }

  switch (sortValue) {
    case "name":
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    case "priceLow":
      data.sort(
        (a, b) =>
          a.pricePerHour - b.pricePerHour
      );
      break;

    case "priceHigh":
      data.sort(
        (a, b) =>
          b.pricePerHour - a.pricePerHour
      );
      break;

    case "experience":
      data.sort(
        (a, b) =>
          b.experience - a.experience
      );
      break;

    default:
      break;
  }

  setFilteredWorkers(data);
};

  const loadRatings = async (workerList) => {
    const ratingData = {};

    for (const worker of workerList) {
      try {
        const averageResponse = await api.get(
          `/ratings/average/${worker.id}`
        );

        const reviewsResponse = await api.get(
          `/ratings/worker/${worker.id}`
        );

        ratingData[worker.id] = {
          average: Number(
            averageResponse.data
          ).toFixed(1),

          count: reviewsResponse.data.length,

          reviews: reviewsResponse.data,
        };
      } catch (error) {
        console.error(
          `Rating Error Worker ${worker.id}:`,
          error
        );

        ratingData[worker.id] = {
          average: "0.0",
          count: 0,
          reviews: [],
        };
      }
    }

    setRatings(ratingData);
  };

  const bookWorker = (worker) => {
    navigate("/bookings", {
      state: {
        worker: worker,
      },
    });
  };

  const viewReviews = (worker) => {
    navigate("/worker-reviews", {
      state: {
        worker: worker,
        reviews:
          ratings[worker.id]?.reviews || [],
      },
    });
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Workers...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Available Workers</h2>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "15px",
    marginBottom: "25px"
  }}
>

<input
placeholder="Search Worker"
value={search}
onChange={(e)=>{
setSearch(e.target.value);
applyFilters(
e.target.value,
category,
city,
maxPrice,
minExperience,
sortBy
);
}}
/>

<select
value={category}
onChange={(e)=>{
setCategory(e.target.value);
applyFilters(
search,
e.target.value,
city,
maxPrice,
minExperience,
sortBy
);
}}
>
<option>All</option>
<option>Electrician</option>
<option>Plumber</option>
<option>Carpenter</option>
<option>Painter</option>
<option>Cleaner</option>
<option>AC Technician</option>
</select>

<input
  type="text"
  placeholder="City"
  value={city === "All" ? "" : city}
  onChange={(e) => {
    const cityValue = e.target.value;

    setCity(cityValue === "" ? "All" : cityValue);

    applyFilters(
      search,
      category,
      cityValue === "" ? "All" : cityValue,
      maxPrice,
      minExperience,
      sortBy
    );
  }}
/>

<input
  type="number"
  placeholder="Max Price"
  value={maxPrice}
  onChange={(e) => {

    setMaxPrice(e.target.value);

    applyFilters(
      search,
      category,
      city,
      e.target.value,
      minExperience,
      sortBy
    );

  }}
/>

<input
  type="number"
  placeholder="Min Experience"
  value={minExperience}
  onChange={(e) => {

    setMinExperience(e.target.value);

    applyFilters(
      search,
      category,
      city,
      maxPrice,
      e.target.value,
      sortBy
    );

  }}
/>

<select
  value={sortBy}
  onChange={(e) => {

    setSortBy(e.target.value);

    applyFilters(
      search,
      category,
      city,
      maxPrice,
      minExperience,
      e.target.value
    );

  }}
>

  <option value="">Default</option>

  <option value="name">
    Name A-Z
  </option>

  <option value="priceLow">
    Price Low → High
  </option>

  <option value="priceHigh">
    Price High → Low
  </option>

  <option value="experience">
    Experience
  </option>

</select>

</div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!error && workers.length === 0 && (
        <p>No workers available.</p>
      )}

     {filteredWorkers.map((worker) => {
        const workerRating =
          ratings[worker.id];

        return (
          <div
            className="worker-card"
            key={worker.id}
          >
            <h3>{worker.name}</h3>
            <img
  src={
    worker.imageUrl
      ? `https://helperhub.onrender.com/uploads/${worker.imageUrl}`
      : "https://via.placeholder.com/120"
  }
  alt={worker.name}
  style={{
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px"
  }}
/>

            <p>
              <b>Category:</b>{" "}
              {worker.category}
            </p>

            <p>
              <b>City:</b> {worker.city}
            </p>

            <p>
              <b>Experience:</b>{" "}
              {worker.experience} Years
            </p>

            <p>
              <b>Price:</b> ₹
              {worker.pricePerHour} / hour
            </p>

            <p>
              <b>Rating:</b>{" "}
              ⭐{" "}
              {workerRating?.average || "0.0"}
              {" "}
              ({workerRating?.count || 0} Reviews)
            </p>

            <button
              type="button"
              onClick={() =>
                bookWorker(worker)
              }
            >
              Book Now
            </button>

            <button
              type="button"
              onClick={() =>
                viewReviews(worker)
              }
              style={{
                marginLeft: "10px",
              }}
            >
              View Reviews
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Workers;