const Question = require("../models/Question");

// Submit a question
exports.submitQuestion = async (req, res) => {
  try {
    const { subject, question, resources } = req.body;

    // Validation
    if (!subject || !question) {
      return res.status(400).json({
        success: false,
        message: "Subject and question are required.",
      });
    }

    // Create a new question entry
    const newQuestion = new Question({
      subject,
      question,
      resources,
    });

    // Save to database
    await newQuestion.save();

    res.status(201).json({
      success: true,
      message: "Question submitted successfully!",
      data: newQuestion,
    });
  } catch (error) {
    console.error("Error submitting question:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });

    // Group questions by subject
    const groupedQuestions = questions.reduce((acc, question) => {
      const { subject } = question;

      if (!acc[subject]) {
        acc[subject] = [];
      }

      acc[subject].push({
        _id: question._id,
        question: question.question,
        resources: question.resources,
        createdAt: question.createdAt,
      });

      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: groupedQuestions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get questions by subject
exports.getQuestionsBySubject = async (req, res) => {
  try {
    const subject = req.params.subject;
    const questions = await Question.find({ subject });

    if (!questions.length) {
      return res
        .status(404)
        .json({ message: "No questions found for this subject." });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
