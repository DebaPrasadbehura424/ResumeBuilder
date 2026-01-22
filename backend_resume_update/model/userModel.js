const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

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
