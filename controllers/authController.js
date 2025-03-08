const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION } = require("../config/config");

// Register user
const registerUser = async (req, res) => {
  const { username, password, roles } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ username, password, roles });
    await user.save();

    const payload = {
      user: {
        id: user._id,
        username: user.username,
        roles: user.roles,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = {
      user: {
        id: user._id,
        username: user.username,
        roles: user.roles,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token: token, user: payload.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { registerUser, loginUser };
