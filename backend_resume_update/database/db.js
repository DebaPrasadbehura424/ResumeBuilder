const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://debaprasadbehura89:s5dY5LSzdhymR4AB@cluster0.9chhe.mongodb.net/Resume_Maker?retryWrites=true&w=majority&appName=Cluster0;",
  )
  .then(() => {
    console.log("connected to mongodb succesdfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
