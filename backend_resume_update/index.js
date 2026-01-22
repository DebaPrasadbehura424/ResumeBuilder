const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
require("./database/db");

const userRouter = require("./routes/userRoutes");
const resumeRouter = require("./routes/resumeRoutes");
const aiRouter = require("./routes/aiRoutes");

const PORT = process.env.PORT || 8787;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Resume backend running at server ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
