const express = require("express");

const router = express.Router();

const {
  getDashboard
} = require(
  "../controllers/dashboardController"
);

router.get(
  "/stats",
  getDashboard
);

module.exports = router;