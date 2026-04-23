const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const USER = { username: "admin", password: "admin123" };

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;