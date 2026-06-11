const mongoose = require("mongoose");

const studyHistorySchema =
new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  activity: String
}, { timestamps: true });

module.exports =
mongoose.model(
  "StudyHistory",
  studyHistorySchema
);