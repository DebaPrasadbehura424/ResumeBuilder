const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    resumeList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Resumenew",
      },
    ],
  },
  { timestamps: true },
);

module.exports.userModel = mongoose.model("Usernew", userSchema);
