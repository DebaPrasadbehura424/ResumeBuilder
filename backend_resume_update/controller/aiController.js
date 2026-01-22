const { improveSummary } = require("../ai/localAi");

exports.improveResumeSummary = async (req, res) => {
  try {
    const { summary } = req.body;
    if (!summary || summary.length < 10) {
      return res.status(400).json({ message: "Summary too short" });
    }
    const improved = await improveSummary(summary);
    res.status(200).json({
      improvedSummary: improved,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
