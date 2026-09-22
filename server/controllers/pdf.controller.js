import PDFDocument from "pdfkit";

export const pdfDownload = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).send("Missing result data");
    }

    // Validate important data before starting PDF stream
    const importantTopics = result.importantTopics || {};
    const veryImportant = Array.isArray(importantTopics.veryImportant)
      ? importantTopics.veryImportant
      : [];

    const important = Array.isArray(importantTopics.important)
      ? importantTopics.important
      : [];

    const lessImportant = Array.isArray(importantTopics.lessImportant)
      ? importantTopics.lessImportant
      : [];

    const revisionPoints = Array.isArray(result.revisionPoints)
      ? result.revisionPoints
      : [];

    const shortQuestions = Array.isArray(result.questions?.short)
      ? result.questions.short
      : [];

    const longQuestions = Array.isArray(result.questions?.long)
      ? result.questions.long
      : [];

    const diagramQuestions = Array.isArray(result.questions?.diagram)
      ? result.questions.diagram
      : [];

    const doc = new PDFDocument({
      margin: 30,
      size: "A4",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ExamNotes.pdf"
    );

    doc.pipe(res);

    // Title
    doc
      .fontSize(20)
      .text("Exam Notes", {
        align: "center",
      });

    doc.moveDown();

    // Topic information
    doc.fontSize(14).text(`Topic: ${result.topic || "Not Specified"}`);
    doc.text(`Class: ${result.classLevel || "Not Specified"}`);
    doc.text(`Exam: ${result.examType || "General"}`);

    doc.moveDown();

    // Important Topics
    doc.fontSize(16).text("Important Topics", {
      underline: true,
    });

    doc.moveDown();

    if (veryImportant.length > 0) {
      doc.fontSize(13).text("Very Important");

      veryImportant.forEach((topic) => {
        doc.fontSize(11).text(`- ${topic}`);
      });

      doc.moveDown();
    }

    if (important.length > 0) {
      doc.fontSize(13).text("Important");

      important.forEach((topic) => {
        doc.fontSize(11).text(`- ${topic}`);
      });

      doc.moveDown();
    }

    if (lessImportant.length > 0) {
      doc.fontSize(13).text("Less Important");

      lessImportant.forEach((topic) => {
        doc.fontSize(11).text(`- ${topic}`);
      });

      doc.moveDown();
    }

    // Notes
    doc.fontSize(16).text("Notes", {
      underline: true,
    });

    doc.moveDown();

    const notes = result.notes || "No notes available.";

    doc
      .fontSize(11)
      .text(notes.replace(/[#*]/g, ""), {
        align: "left",
      });

    doc.moveDown();

    // Revision Points
    doc.fontSize(16).text("Revision Points", {
      underline: true,
    });

    doc.moveDown();

    if (revisionPoints.length > 0) {
      revisionPoints.forEach((point) => {
        doc.fontSize(11).text(`- ${point}`);
      });
    } else {
      doc.fontSize(11).text("No revision points available.");
    }

    doc.moveDown();

    // Questions
    doc.fontSize(16).text("Important Questions", {
      underline: true,
    });

    doc.moveDown();

    // Short Questions
    doc.fontSize(13).text("Short Questions");

    doc.moveDown();

    if (shortQuestions.length > 0) {
      shortQuestions.forEach((question) => {
        doc.fontSize(11).text(`- ${question}`);
        doc.moveDown(0.3);
      });
    } else {
      doc.fontSize(11).text("No short questions available.");
    }

    doc.moveDown();

    // Long Questions
    doc.fontSize(13).text("Long Questions");

    doc.moveDown();

    if (longQuestions.length > 0) {
      longQuestions.forEach((question) => {
        doc.fontSize(11).text(`- ${question}`);
        doc.moveDown(0.3);
      });
    } else {
      doc.fontSize(11).text("No long questions available.");
    }

    doc.moveDown();

    // Diagram Questions
    doc.fontSize(13).text("Diagram Questions");

    doc.moveDown();

    if (diagramQuestions.length > 0) {
      diagramQuestions.forEach((question) => {
        doc.fontSize(11).text(`- ${question}`);
        doc.moveDown(0.3);
      });
    } else {
      doc.fontSize(11).text("No diagram questions available.");
    }

    doc.moveDown();

    // Diagram
    doc.fontSize(16).text("Diagram", {
      underline: true,
    });

    doc.moveDown();

    if (result.diagram?.data) {
      doc
        .fontSize(9)
        .text(result.diagram.data, {
          align: "left",
        });
    } else {
      doc.fontSize(11).text("No diagram available.");
    }

    // Finish PDF
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);

    // Only send an error response if headers haven't been sent
    if (!res.headersSent) {
      res.status(500).send("Error generating PDF");
    }
  }
};