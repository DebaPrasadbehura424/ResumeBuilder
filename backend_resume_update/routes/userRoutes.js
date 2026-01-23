const express = require("express");
const router = express.Router();

const {
  login,
  register,
  me,
  profile,
} = require("../controller/userController");
const { authMiddleware } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", register);
router.get("/me", authMiddleware, me);
router.get("/profile", authMiddleware, profile);

module.exports = router;
