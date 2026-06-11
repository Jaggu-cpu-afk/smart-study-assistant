const express = require("express");

const router = express.Router();

const {
generateNotesFromPDF,
generateMCQ,
generateFlashcards,
generateViva,
generateExam
} = require("../controllers/aiController");

router.post(
"/generate-notes/:pdfId",
generateNotesFromPDF
);

router.post(
"/generate-mcq/:pdfId",
generateMCQ
);

router.post(
"/generate-flashcards/:pdfId",
generateFlashcards
);

router.post(
"/generate-viva/:pdfId",
generateViva
);

router.post(
"/generate-exam/:pdfId",
generateExam
);

module.exports = router;
