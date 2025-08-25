const express = require("express");
const { createCanvas, updateCanvas, loadCanvas, shareCanvas, unshareCanvas, deleteCanvas, getUserCanvases} = require("../WB_controllers/user_controller");
const { authMiddleware } = require("../WB_middlewares/middleware_auth");

const router = express.Router();

router.post("/create", authMiddleware, createCanvas);  
router.get("/load/:id", authMiddleware, loadCanvas); 
router.put("/share/:id", authMiddleware, shareCanvas); 
router.put("/unshare/:id", authMiddleware, unshareCanvas);
router.delete("/delete/:id", authMiddleware, deleteCanvas); 
router.get("/list", authMiddleware, getUserCanvases);

module.exports = router;