import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const emptyForm = {
    title: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  };

  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
  };

  const saveService = async () => {
    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.price ||
        !formData.duration ||
        !formData.image
      ) {
        alert("Please fill all fields.");
        return;
      }

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/services/${editingId}`,
          formData
        );
        alert("Service Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/services",
          formData
        );
        alert("Service Added Successfully");
      }

      clearForm();
      fetchServices();
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const editService = (service) => {
    setEditingId(service._id);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      fetchServices();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h2>{services.length}</h2>
          <p>Total Services</p>
        </div>

        <div className="card">
          <h2>
            ₹
            {services.reduce(
              (sum, s) => sum + Number(s.price || 0),
              0
            )}
          </h2>
          <p>Total Service Value</p>
        </div>
      </div>

      <div className="booking-card">
        <h2>{editingId ? "Edit Service" : "Add New Service"}</h2>

        <input
          className="time-input"
          name="title"
          placeholder="Service Name"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          className="time-input"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          className="time-input"
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          className="time-input"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <input
          className="time-input"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn" onClick={saveService}>
            {editingId ? "Update Service" : "Add Service"}
          </button>

          {editingId && (
            <button className="cancel-btn" onClick={clearForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <table className="booking-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Service</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </td>

              <td>{service.title}</td>
              <td>₹{service.price}</td>
              <td>{service.duration}</td>

              <td>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="confirm-btn"
                    onClick={() => editService(service)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteService(service._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
