const express = require("express");
const router = express.Router();

const {
  create,
  update,
  getOne,
  getAll,
  remove,
  aiOptimize,
} = require("../controller/resumeController");

const { authMiddleware } = require("../middleware/auth");

router.post("/create", authMiddleware, create);

// router.post("/my_resumes", authMiddleware, create);

router.put("/update/:id", authMiddleware, update);
router.get("/getall", authMiddleware, getAll);
router.get("/getone/:id", getOne);

router.delete("/remove/:id", authMiddleware, remove);

router.delete("/ai_optimize", aiOptimize);

module.exports = router;
