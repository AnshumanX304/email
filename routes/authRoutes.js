const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/refresh", authController.refreshToken);
router.post("/email", authController.email);

module.exports = router;
