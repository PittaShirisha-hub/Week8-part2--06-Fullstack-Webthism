const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");
const sendSMS = require("../utils/sendSMS");

// ================================
// Create Booking
// ================================
const createBooking = async (req, res) => {
  try {
    console.log("========== Booking Request ==========");
    console.log(req.body);
    console.log("====================================");

    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });
  } catch (error) {
    console.log("Booking Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// Get All Bookings
// ================================
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("serviceId");

    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// Delete Booking
// ================================
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// Update Booking Status
// ================================
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    ).populate("serviceId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking Not Found",
      });
    }

    console.log("Booking Status:", booking.status);

    // ================================
    // Send Email & SMS
    // ================================
    if (booking.status === "Confirmed") {

      // Email Notification
      await sendEmail(
        "pshirisha501@gmail.com",
        "Booking Confirmation",
        `
Hello,

Your booking has been confirmed successfully.

----------------------------------
Service      : ${booking.serviceId.title}
Description  : ${booking.serviceId.description}
Price        : ₹${booking.serviceId.price}
Date         : ${booking.bookingDate}
Time         : ${booking.timeSlot}
Status       : ${booking.status}
----------------------------------

Thank you for choosing our Service Booking Platform.

Have a wonderful day!
`
      );

      // SMS Notification
      await sendSMS(
        "+919154820998", // verified mobile number
        `Booking Confirmed!

Service: ${booking.serviceId.title}

Date: ${booking.bookingDate}

Time: ${booking.timeSlot}

Status: ${booking.status}

Thank you for choosing our Service Booking Platform.`
      );

      console.log("Email & SMS Sent Successfully");
    }

    res.status(200).json({
      success: true,
      message: "Booking Status Updated Successfully",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  deleteBooking,
  updateBookingStatus,
};