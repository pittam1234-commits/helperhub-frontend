import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function WorkerRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    category: "",
    city: "",
    experience: "",
    pricePerHour: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const registerWorker = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/auth/worker/register",
        formData
      );

      alert("Worker Registration Successful");

      navigate("/worker/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.response?.data ||
        "Worker Registration Failed"
      );

    }

  };

  return (

    <div className="container">

      <h2>Worker Registration</h2>

      <form onSubmit={registerWorker}>

        <input
          type="text"
          name="name"
          placeholder="Worker Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        <select
          name="category"
          onChange={handleChange}
          required
        >

          <option value="">
            Select Category
          </option>

          <option value="Electrician">
            Electrician
          </option>

          <option value="Plumber">
            Plumber
          </option>

          <option value="Carpenter">
            Carpenter
          </option>

          <option value="Painter">
            Painter
          </option>

          <option value="Cleaner">
            Cleaner
          </option>

          <option value="AC Technician">
            AC Technician
          </option>

        </select>

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="experience"
          placeholder="Experience In Years"
          onChange={handleChange}
          min="0"
          required
        />

        <input
          type="number"
          name="pricePerHour"
          placeholder="Price Per Hour"
          onChange={handleChange}
          min="0"
          required
        />

        <button type="submit">
          Register As Worker
        </button>

      </form>

      <p>
        Already registered?
        {" "}
        <button
          type="button"
          onClick={() =>
            navigate("/worker/login")
          }
        >
          Worker Login
        </button>
      </p>

    </div>

  );

}

export default WorkerRegister;