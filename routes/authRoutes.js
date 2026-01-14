const User = require("../models/user");
const Job = require('../models/jobSchema')
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to protected route",
    user: req.user,
  });
});

// Register route

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  //Validate kro
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, and password",
    });
  }
  // email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: " Provide vaild email",
    });
  }

  // password validation

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password should be 6 letters",
    });
  }

  // password hashing...
  try {
    // 4️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save user in mongo db
    const user = await User.create({
      name, email, password: hashedPassword, role: role || "user"
    });

    // Success response
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (err) {
    console.log("REGISTER ERROR", err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Login Route

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //basic validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Enter valid email or password",
    });
  }

  try {

    // ✅ Fetch user from DB
    const saveduser = await User.findOne({ email });
    if (!saveduser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // password match

    const isMatch = await bcrypt.compare(password, saveduser.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Entercorrect Password",
      });
    }
    const token = jwt.sign({ userId: saveduser._id, role: saveduser.role }, JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({
      success: true,
      message: " Login successfully",
      token: token,
    });
  } catch (err) {
    console.log("LOGIN ERROR 👉", err.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
