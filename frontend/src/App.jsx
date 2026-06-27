import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import BookingSuccess from "./pages/BookingSuccess";
import Admin from "./pages/Admin";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/mybookings" element={<MyBookings />} />

        <Route path="/success" element={<BookingSuccess />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/payment" element={<Payment />} />

        <Route
          path="/payment-success"
          element={<PaymentSuccess />}
        />

        <Route
          path="/payment-failed"
          element={<PaymentFailed />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;