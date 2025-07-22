const express = require("express");
const Resumerouter = express.Router();
const ResumeModel = require("../model/ResumeDetails.Model");
const Resumer = require("../model/ResumerModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

Resumerouter.post("/createResume", upload.single("photo"), async (req, res) => {
  try {
    const { email } = req.query;
    const resumeData = req.body;

    const photoPath = req.file ? req.file.path : null;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!photoPath) {
      return res.status(400).json({ message: "Profile photo is required" });
    }

    resumeData.profilePhoto = photoPath;

    const newResume = new ResumeModel(resumeData);
    await newResume.save();

    const user = await Resumer.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.resumes.push(newResume._id);
    await user.save();

    res.status(201).json({
      message: "Resume created and linked to user successfully",
      resume: newResume,
    });
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

Resumerouter.get("/getResumes", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await Resumer.findOne({ email }).populate("resumes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Resumes fetched successfully",
      data: user.resumes,
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

Resumerouter.post("/getResumesById", async (req, res) => {
  try {
    const { resumeId } = req.body;

    const resumes = await ResumeModel.findById(resumeId);

    res.status(200).json(resumes);
  } catch (error) {
    console.error("❌ Error fetching resumes:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

Resumerouter.delete("/deleteResume", async (req, res) => {
  const { userEmail, id } = req.body;

  try {
    const user = await Resumer.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const resume = await ResumeModel.findById(id);
    if (!resume) {
      return res.status(404).json("Resume not found");
    }

    await Resumer.updateOne({ email: userEmail }, { $pull: { resumes: id } });

    await ResumeModel.deleteOne({ _id: id });

    res.status(200).json("Resume deleted successfully");
  } catch (err) {
    res.status(500).json("Server error");
  }
});

Resumerouter.patch("/updateResume/:resumeId", async (req, res) => {
  try {
    const { resumeId } = req.params;
    const form = req.body;

    const resume = await ResumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.NumberType = form.NumberType;
    resume.profilePhoto = form.profilePhoto || resume.profilePhoto;
    resume.name = form.name;
    resume.email = form.email;
    resume.phone = form.phone;
    resume.location = form.location;
    resume.linkedin = form.linkedin;
    resume.summary = form.summary;

    resume.skills = form.skills || [];
    resume.experience = form.experience || [];
    resume.education = form.education || [];
    resume.projects = form.projects || [];
    resume.certifications = form.certifications || [];

    await resume.save();

    res.status(200).json({
      message: "Resume updated successfully",
      data: resume,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error: error.message });
  }
});


module.exports = Resumerouter;
