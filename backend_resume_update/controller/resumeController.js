const { resumeModel } = require("../model/resumeModel");
const { userModel } = require("../model/userModel");

/**
 * CREATE RESUME
 * POST /api/resume
 */
exports.create = async (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData || !resumeData.basic_info) {
      return res.status(400).json({ message: "data is not valid" });
    }

    const resume = await resumeModel.create({
      ...resumeData,
      userId: req.userId,
    });

    await userModel.findByIdAndUpdate(req.userId, {
      $push: { resumeList: resume._id },
    });

    return res.status(201).json({
      message: "Resume created successfully",
      resume,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * UPDATE RESUME
 * PUT /api/resume/:id
 */
exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const resume = await resumeModel.findOneAndUpdate(
      { _id: id, userId: req.userId }, // security check
      req.body,
      { new: true },
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({
      message: "Resume updated successfully",
      resume,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET SINGLE RESUME
 * GET /api/resume/:id
 */
exports.getOne = async (req, res) => {
  try {
    const resume = await resumeModel.findOne({
      _id: req.params.id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL USER RESUMES
 * GET /api/resume
 */
exports.getAll = async (req, res) => {
  try {
    const resumes = await resumeModel.find({ userId: req.userId });

    return res.status(200).json({
      resumes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE RESUME
 * DELETE /api/resume/:id
 */
exports.remove = async (req, res) => {
  try {
    const resume = await resumeModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    await userModel.findByIdAndUpdate(req.userId, {
      $pull: { resumeList: req.params.id },
    });

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.aiOptimize = async (req, res) => {
  try {
    const resume = await resumeModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    await userModel.findByIdAndUpdate(req.userId, {
      $pull: { resumeList: req.params.id },
    });

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
