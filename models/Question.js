const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  question: { type: String, required: true },
  resources: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionSchema);
