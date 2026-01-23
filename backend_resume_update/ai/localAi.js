// const axios = require("axios");

// const OLLAMA_URL = "http://localhost:11434/api/generate";

// exports.improveSummary = async (summaryText) => {
//   const prompt = `
// You are a professional resume writer.

// Rules:
// - Do NOT add fake experience
// - Do NOT change facts
// - Improve grammar and professionalism
// - Keep it 3–4 lines
// - Text only
// Rewrite this resume summary professionally:
// "${summaryText}"
// `;

//   const response = await axios.post(OLLAMA_URL, {
//     model: "llama3:8b",
//     prompt: prompt,
//     stream: false,
//   });

//   return response.data.response.trim();
// };
