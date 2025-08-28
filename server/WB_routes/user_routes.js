const express = require("express");
const { registerUser, loginUser, getUser } = require("../WB_controllers/user_controller");
const { middleware_auth } = require("../WB_middlewares/middleware_auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", middleware_auth, getUser);


module.exports = router;
