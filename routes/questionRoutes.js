const express = require("express");
const router = express.Router();

const {
  submitQuestion,
  getAllQuestions,
  getQuestionsBySubject,
} = require("../controllers/questionController");
const { authMiddleware } = require("../middlewares/authMiddleware"); // Ensure only authenticated users can submit questions

// Route to submit a question
// router.post("/questions", authMiddleware, submitQuestion);
router.post("/questions", submitQuestion);
// router.get('/questions', authMiddleware, getAllQuestions);
router.get("/questions", getAllQuestions);
router.get("/questions/:subject", getQuestionsBySubject);
module.exports = router;
