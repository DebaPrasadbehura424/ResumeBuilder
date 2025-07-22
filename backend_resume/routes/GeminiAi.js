const express = require("express");
const aiRouter = express.Router();
const axios = require("axios");

aiRouter.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  const GEMINI_API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const GEMINI_API_KEY = "AIzaSyAOd0c_05TGpxk6GFERgg4kU2QEqoZqJhM";

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const aiText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response.";
    res.json({ reply: aiText });
  } catch (error) {
    console.error(
      "Error calling Gemini API:",
      error?.response?.data || error.message
    );
    res.status(500).json({ error: "Gemini API call failed." });
  }
});

module.exports = aiRouter;
