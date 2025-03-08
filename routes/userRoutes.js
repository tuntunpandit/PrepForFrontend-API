const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController");
const {
  authMiddleware,
  adminRoleMiddleware,
} = require("../middlewares/authMiddleware");

// This route will be protected, only admins can access it
// router.get("/users", authMiddleware, adminRoleMiddleware, getAllUsers);
router.get("/users", getAllUsers);

module.exports = router;
