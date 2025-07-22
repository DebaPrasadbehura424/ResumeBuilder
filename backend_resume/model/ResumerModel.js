const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResumeModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
  },
  profilePic: {
    type: String,
  },
  resumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
  ],
});

module.exports = mongoose.model("Resume_User", ResumeModel);
