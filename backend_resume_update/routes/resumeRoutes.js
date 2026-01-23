const express = require("express");
const router = express.Router();

const {
  create,
  update,
  getOne,
  getAll,
  remove,
} = require("../controller/resumeController");

const { authMiddleware } = require("../middleware/auth");

router.post("/create", authMiddleware, create);
router.put("/update/:id", authMiddleware, update);
router.get("/getall", authMiddleware, getAll);
router.get("/getone/:id", authMiddleware, getOne);
router.delete("/remove/:id", authMiddleware, remove);

module.exports = router;
