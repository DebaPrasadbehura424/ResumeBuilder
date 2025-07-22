const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ResumeSchema = new Schema({
  NumberType: {
    type: Number,
    required: true,
    
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
  },
  summary: {
    type: String,
  },
  skills: [String],
  experience: [
    {
      title: String,
      company: String,
      location: String,
      startDate: String,
      endDate: String,
      responsibilities: [String],
    },
  ],
  education: [
    {
      degree: String,
      institution: String,
      location: String,
      startDate: String,
      endDate: String,
    },
  ],
  projects: [
    {
      title: String,
      technologies: String,
      description: String,
    },
  ],
  certifications: [String],
});

module.exports = mongoose.model("Resume", ResumeSchema);
