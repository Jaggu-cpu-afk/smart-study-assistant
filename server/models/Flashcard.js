const mongoose = require("mongoose");

const flashcardSchema =
new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  pdfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PDF"
  },

  content: String

}, {
  timestamps: true
});

module.exports =
mongoose.model(
  "Flashcard",
  flashcardSchema
);