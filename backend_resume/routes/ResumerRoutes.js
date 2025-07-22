const express = require("express");
const router = express.Router();
const Resumer = require("../model/ResumerModel");
const tokenInfo = require("../middleware/TokenInfo");
const multer = require("multer");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Resumer.findOne({ email });
  if (user != null) {
    return res.status(404).json({ error: "User Already Exit" });
  }
  try {
    const newResumer = new Resumer({
      name,
      email,
      password,
    });

    const token = tokenInfo.generateToken(email);
    await newResumer.save();

    res.status(201).json({ token: token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error. Could not register user." });
  }
});
// define multer as memory
const storage = multer.memoryStorage();
const uploads = multer({ storage: storage });
router.post("/upload", uploads.single("profilePic"), async (req, res) => {
  const { email } = req.body;

  try {
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString("base64");

    const user = await Resumer.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.profilePic = base64Image;
    await user.save();

    res.status(200).json({ message: "Profile picture updated!" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Resumer.findOne({ email });

    if (user == null) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password != password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = tokenInfo.generateToken(email);
    res.status(200).json({ token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login." });
  }
});
router.get("/getDataByToken", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const decoded = tokenInfo.verify(token);
    const email = decoded.email;

    const user = await Resumer.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Fetched successfully", user });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
