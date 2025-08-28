const express = require("express");
const { createCanvas, updateCanvas, loadCanvas, shareCanvas, unshareCanvas, deleteCanvas, getUserCanvases} = require("../WB_controllers/canvas_controller");
const { middleware_auth } = require("../WB_middlewares/middleware_auth");

const router = express.Router();

router.post("/create", middleware_auth, createCanvas);  
router.get("/load/:id", middleware_auth, loadCanvas); 
router.put("/share/:id", middleware_auth, shareCanvas); 
router.put("/unshare/:id", middleware_auth, unshareCanvas);
router.delete("/delete/:id", middleware_auth, deleteCanvas); 
router.get("/list", middleware_auth, getUserCanvases);

module.exports = router;