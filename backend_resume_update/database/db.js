const mongoose = require("mongoose");

const URI =
  "mongodb+srv://debaprasadbehura89:debaprasadbehura89@cluster0.9chhe.mongodb.net/ResumeMaker?retryWrites=true&w=majority&appName=Cluster0";
// const URI = "mongodb://localhost:27017/ResumeMaker";
mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// mongodb+srv://debaprasadbehura89:<db_password>@cluster0.9chhe.mongodb.net/?appName=Cluster0
