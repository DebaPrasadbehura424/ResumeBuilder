const express = require("express");
const router = express.Router();

const { improveResumeSummary } = require("../controller/aiController");

router.post("/improve-summary", improveResumeSummary);

module.exports = router;
