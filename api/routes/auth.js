const router = require("express").Router();
const authController = require("../controller/auth");

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

module.exports = router;
