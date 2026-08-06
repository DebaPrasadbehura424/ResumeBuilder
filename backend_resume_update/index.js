const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
require("./database/db");

const userRouter = require("./routes/userRoutes");
const resumeRouter = require("./routes/resumeRoutes");

const PORT = process.env.PORT || 8787;

// const f_url = "https://resumebuilderfrontend-three.vercel.app";
const f_url = "http://localhost:5173";

app.use(
  cors({
    origin: f_url,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Resume backend running at server ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/resume", resumeRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
