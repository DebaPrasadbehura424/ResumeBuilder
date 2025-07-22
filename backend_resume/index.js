const express = require("express");
const app = express();
const body_parser = require("body-parser");
const db = require("./database/db");
const cors = require("cors");
const resumeRoutes = require("./routes/ResumerRoutes");
const resumeCreates = require("./routes/ResumeCreate");
const geminiRoute = require("./routes/GeminiAi");

const path = require("path");
require("dotenv").config({ quiet: true });

const PORT = process.env.PORT || 8787;
app.use(cors("http://localhost:5173"));

app.use(express.json());
app.use(body_parser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send(`Resume backend running at server ${PORT}`);
});

app.use("/api/resumer", resumeRoutes);
app.use("/api/resumerCreate", resumeCreates);
app.use("/api/gemini", geminiRoute);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
