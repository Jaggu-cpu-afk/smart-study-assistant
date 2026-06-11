const express = require("express");

const router = express.Router();

const {
  uploadPDF
} = require("../controllers/pdfController");

const protect =
require("../middleware/authMiddleware");

const upload =
require("../middleware/uploadMiddleware");

router.post(
  "/upload",
  protect,
  upload.single("pdf"),
  uploadPDF
);

module.exports = router;