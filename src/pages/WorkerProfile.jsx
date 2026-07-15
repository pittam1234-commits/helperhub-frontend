import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function WorkerProfile() {
  const workerId = localStorage.getItem("workerId");
  const [selectedFile, setSelectedFile] = useState(null);
  const [worker, setWorker] = useState({
    
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    category: "",
    experience: "",
    pricePerHour: "",
    available: true
  });
  

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const response = await api.get(`/workers/${workerId}`);

      setWorker(response.data);

    } catch (error) {

      console.log(error);

      alert("Unable to load profile.");

    }

  };

  const updateProfile = async () => {

    try {

      const response = await api.put(
        `/workers/${workerId}`,
        worker
      );

      setWorker(response.data);

      alert("Profile Updated Successfully");

    } catch (error) {

      console.log(error);

      alert("Profile Update Failed");

    }

  };

  const changeAvailability = async () => {
    try {

      const newStatus = !worker.available;

      const response = await api.put(
        `/workers/${workerId}/availability?available=${newStatus}`
      );

      setWorker(response.data);

      alert("Availability Updated Successfully");

    } catch (error) {

      console.log(error);

      alert("Availability Update Failed");

    }

  };
  const uploadImage = async () => {

  if (!selectedFile) {
    alert("Please select an image");
    return;
  }

  try {

    const formData = new FormData();

    formData.append("file", selectedFile);

    await api.post(
      `/workers/${workerId}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Image Uploaded Successfully");

    loadProfile();

  } catch (error) {
  console.log(error);

  alert(
    "Status: " + error.response?.status +
    "\nMessage: " +
    JSON.stringify(error.response?.data)
  );
}

};

  

  return (

    <div className="container">

      <div className="profile-card">
        <div
  style={{
    textAlign: "center",
    marginBottom: "20px"
  }}
>

  <img
    src={
      worker.imageUrl
        ? `https://helperhub.onrender.com/uploads/${worker.imageUrl}`
        : "https://via.placeholder.com/150"
    }
    alt="Worker"
    style={{
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #007bff"
    }}
  />

</div>

        <h1>Worker Profile</h1>

        <div className="form-group">

          <label>Full Name</label>

          <input
            type="text"
            value={worker.name}
            readOnly
          />

        </div>

        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            value={worker.email}
            readOnly
          />

        </div>

        <div className="form-group">

          <label>Mobile Number</label>

          <input
            type="text"
            value={worker.phone}
            onChange={(e) =>
              setWorker({
                ...worker,
                phone: e.target.value
              })
            }
          />

        </div>

        <div className="form-group">

          <label>City</label>

          <input
            type="text"
            value={worker.city}
            onChange={(e) =>
              setWorker({
                ...worker,
                city: e.target.value
              })
            }
          />

        </div>

        <div className="form-group">

          <label>Category</label>

          <input
            type="text"
            value={worker.category}
            readOnly
          />

        </div>

        <div className="form-group">

          <label>Experience (Years)</label>

          <input
            type="text"
            value={worker.experience}
            readOnly
          />

        </div>

        <div className="form-group">

          <label>Amount Per Hour (₹)</label>

          <input
            type="number"
            value={worker.pricePerHour}
            onChange={(e) =>
              setWorker({
                ...worker,
                pricePerHour: e.target.value
              })
            }
          />

        </div>

        <div className="form-group">

          <label>Availability</label>

          <h3
            style={{
              color: worker.available ? "green" : "red"
            }}
          >
            {worker.available ? "Available" : "Unavailable"}
          </h3>

        </div>
        <div className="form-group">

  <label>Profile Image</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setSelectedFile(e.target.files[0])}
  />

  <button
    type="button"
    onClick={uploadImage}
    style={{
      marginTop: "10px"
    }}
  >
    Upload Image
  </button>

</div>


        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px"
          }}
        >

          <button
            onClick={changeAvailability}
          >
            Toggle Availability
          </button>

          <button
            onClick={updateProfile}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  );

}

export default WorkerProfile;