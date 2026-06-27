const express = require("express");

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

// Create Service
router.post("/", createService);

// Get All Services
router.get("/", getServices);

// Get Single Service
router.get("/:id", getServiceById);

// Update Service
router.put("/:id", updateService);

// Delete Service
router.delete("/:id", deleteService);

module.exports = router;