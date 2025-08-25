const express = require("express");
const { registerUser, loginUser, getUser } = require("../WB_controllers/user_controller");
const { authMiddleware } = require("../WB_middlewares/middleware_auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUser);


module.exports = router;
