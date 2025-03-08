const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to check if the user is authenticated
exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Tken", token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    console.log("secret", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.user = decoded.user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// Middleware to check if the user has an admin role
exports.adminRoleMiddleware = (req, res, next) => {
  const userId = req.user.id;

  User.findById(userId)
    .then((user) => {
      if (user && user.roles.includes("admin")) {
        next(); // Proceed if user is admin
      } else {
        return res.status(403).json({
          success: false,
          message: "Access denied, admin role required",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Server error" });
    });
};
