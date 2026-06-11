const PDF = require("../models/PDF");
const Notes = require("../models/Notes");
const MCQ = require("../models/MCQ");
const Flashcard = require("../models/Flashcard");
const Viva = require("../models/Viva");
const Exam = require("../models/Exam");
const {
  generateNotes,
  generateMCQContent,
  generateFlashcardContent,
  generateVivaContent,
  generateExamContent
} = require("../services/geminiService");
// Generate Notes
exports.generateNotesFromPDF = async (req, res) => {
try {

  console.log('AI generateNotesFromPDF hit. params:', req.params);
  console.log('AI request headers:', req.headers);

const { pdfId } = req.params;

const pdf = await PDF.findById(pdfId);

if (!pdf) {
  return res.status(404).json({
    success: false,
    message: "PDF Not Found"
  });
}

const notes = await generateNotes(
  pdf.extractedText
);

const savedNotes = await Notes.create({
  userId: pdf.uploadedBy,
  pdfId: pdf._id,
  content: notes
});

res.status(200).json({
  success: true,
  notes: savedNotes
});


} catch (error) {

    console.error('AI generation error:', error.response?.status, error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message
    });


}
};

// Generate MCQs
exports.generateMCQ = async (req, res) => {
try {


const { pdfId } = req.params;
const { count } = req.body;

const pdf = await PDF.findById(pdfId);

if (!pdf) {
  return res.status(404).json({
    success: false,
    message: "PDF Not Found"
  });
}

const mcqs = await generateMCQContent(
  pdf.extractedText,
  count || 10
);

const savedMCQ =
await MCQ.create({
  userId: pdf.uploadedBy,
  pdfId: pdf._id,
  content: mcqs
});

res.status(200).json({
  success: true,
  mcqs: savedMCQ
});

} catch (error) {


res.status(500).json({
  success: false,
  message: error.message
});

}
};

// Generate Flashcards
exports.generateFlashcards = async (req, res) => {
try {

const { pdfId } = req.params;

const pdf = await PDF.findById(pdfId);

if (!pdf) {
  return res.status(404).json({
    success: false,
    message: "PDF Not Found"
  });
}

const flashcards =
  await generateFlashcardContent(
    pdf.extractedText
  );

const savedFlashcards =
await Flashcard.create({
  userId: pdf.uploadedBy,
  pdfId: pdf._id,
  content: flashcards
});

res.status(200).json({
  success: true,
  flashcards: savedFlashcards
});

} catch (error) {


res.status(500).json({
  success: false,
  message: error.message
});


}
};

// Generate Viva
exports.generateViva = async (req, res) => {
try {


const { pdfId } = req.params;

const pdf = await PDF.findById(pdfId);

if (!pdf) {
  return res.status(404).json({
    success: false,
    message: "PDF Not Found"
  });
}

const viva = await generateVivaContent(
  pdf.extractedText
);

const savedViva =
await Viva.create({
  userId: pdf.uploadedBy,
  pdfId: pdf._id,
  content: viva
});

res.status(200).json({
  success: true,
  viva: savedViva
});


} catch (error) {

res.status(500).json({
  success: false,
  message: error.message
});


}
};

// Generate Exam Questions
exports.generateExam = async (req, res) => {
  try {

    const { pdfId } = req.params;

    const pdf = await PDF.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF Not Found"
      });
    }

    const exam =
      await generateExamContent(
        pdf.extractedText
      );

    const savedExam =
await Exam.create({
  userId: pdf.uploadedBy,
  pdfId: pdf._id,
  content: exam
});

res.status(200).json({
  success: true,
  exam: savedExam
});

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};