const mongoose = require("mongoose");
const { Schema } = mongoose;

const resumeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Usernew",
      required: true,
    },

    basic_info: {
      fullname: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      country: { type: String },
      state: { type: String },
      city: { type: String },
    },

    projectsLayout: {
      type: String,
    },

    photo: {
      type: String,
    },

    summary: {
      type: String,
    },

    education: [
      {
        collage_name: { type: String },
        yog: { type: String },
        cgpa: { type: String },
      },
    ],

    skills: [
      {
        type: String,
      },
    ],

    projects: [
      {
        project_name: { type: String },
        tech_stack: [{ type: String }],
        githublink: { type: String },
        livelink: { type: String },
      },
    ],

    certification: [
      {
        cerficate_img: { type: String },
      },
    ],

    headerColor: {
      type: String,
    },

    headerTextColor: {
      type: String,
    },

    bodyColor: {
      type: String,
    },

    bodyTextColor: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports.resumeModel = mongoose.model("Resumenew", resumeSchema);
