const Notes = require("../models/Notes");
const MCQ = require("../models/MCQ");
const Flashcard = require("../models/Flashcard");
const Viva = require("../models/Viva");
const Exam = require("../models/Exam");

exports.getDashboard = async (req, res) => {

  try {

    const notesCount =
      await Notes.countDocuments();

    const mcqCount =
      await MCQ.countDocuments();

    const flashcardCount =
      await Flashcard.countDocuments();

    const vivaCount =
      await Viva.countDocuments();

    const examCount =
      await Exam.countDocuments();

    res.status(200).json({
      success: true,

      stats: {
        notesCount,
        mcqCount,
        flashcardCount,
        vivaCount,
        examCount
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};