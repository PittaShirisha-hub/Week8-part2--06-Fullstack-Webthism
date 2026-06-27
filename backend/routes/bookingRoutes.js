const express = require("express");

const {
  createBooking,
  getBookings,
  deleteBooking,
  updateBookingStatus,
} = require(
  "../controllers/bookingController"
);

const router = express.Router();

// Create Booking
router.post("/", createBooking);

// Get All Bookings
router.get("/", getBookings);

// Delete Booking
router.delete("/:id", deleteBooking);

// Update Status
router.put(
  "/:id/status",
  updateBookingStatus
);

module.exports = router;