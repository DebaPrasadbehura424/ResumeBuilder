const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/ResumeMaker");
mongoose.connect(
  "mongodb+srv://debaprasadbehura89:s5dY5LSzdhymR4AB@cluster0.9chhe.mongodb.net/Resume_Maker?retryWrites=true&w=majority&appName=Cluster0;",
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connected");
});

db.on("disconnected", () => {
  console.log("Database disconnected");
});

db.on("error", (err) => {
  console.log("Error occurred:", err);
});
