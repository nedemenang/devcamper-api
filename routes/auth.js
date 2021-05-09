const express = require("express");
const {
  register,
  login,
  getMe,
  logout,
  forgotPassword,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/forgotpassword", forgotPassword);
router.get("/logout", logout);

module.exports = router;
