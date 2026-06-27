import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings");
    setBookings(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status });
    fetchBookings();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/bookings/${id}`);
    fetchBookings();
  };

  return (
    <div className="container">
      <h1 className="page-title">My Bookings</h1>

      <div className="dashboard-cards">
        <div className="card"><h2>{bookings.length}</h2><p>Total Bookings</p></div>
        <div className="card"><h2>{bookings.filter(b=>b.status==="Pending").length}</h2><p>Pending</p></div>
        <div className="card"><h2>{bookings.filter(b=>b.status==="Confirmed").length}</h2><p>Confirmed</p></div>
        <div className="card"><h2>{bookings.filter(b=>b.status==="Completed").length}</h2><p>Completed</p></div>
        <div className="card"><h2>{bookings.filter(b=>b.status==="Cancelled").length}</h2><p>Cancelled</p></div>
        <div className="card"><h2>₹{bookings.reduce((t,b)=>t+(b.serviceId?.price||0),0)}</h2><p>Total Paid</p></div>
      </div>

      <table className="booking-table">
        <thead>
          <tr><th>Service</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {bookings.map((booking)=>(
            <tr key={booking._id}>
              <td>{booking.serviceId?.title}</td>
              <td>{booking.bookingDate}</td>
              <td>{booking.timeSlot}</td>
              <td>{booking.status}</td>
              <td>
                {booking.status==="Pending" && <>
                  <button className="confirm-btn" onClick={()=>updateStatus(booking._id,"Confirmed")}>Confirm</button>
                  <button className="cancel-btn" onClick={()=>updateStatus(booking._id,"Cancelled")}>Cancel</button>
                </>}
                {booking.status==="Confirmed" &&
                  <button className="complete-btn" onClick={()=>updateStatus(booking._id,"Completed")}>Complete</button>}
                <button className="delete-btn" onClick={()=>handleDelete(booking._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyBookings;
