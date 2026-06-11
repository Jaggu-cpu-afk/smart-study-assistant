const PDF = require("../models/PDF");
const pdfParse = require("pdf-parse");
const fs = require("fs");

exports.uploadPDF = async (req, res) => {

try {   


const dataBuffer =
  fs.readFileSync(req.file.path);

const pdfData =
  await pdfParse(dataBuffer);

const pdf = await PDF.create({

  filename: req.file.filename,

  filepath: req.file.path,

  extractedText: pdfData.text,

  uploadedBy: req.user.id

});

res.status(201).json({

  success: true,

  message: "PDF Uploaded & Text Extracted",

  textLength: pdfData.text.length,

  pdf

});


} catch (error) {


res.status(500).json({

  success: false,

  message: error.message

});


}

};
