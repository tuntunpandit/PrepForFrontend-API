const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Allow cross-origin requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", questionRoutes);
// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Database connection failed:", error));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
