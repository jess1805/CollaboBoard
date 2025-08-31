const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectToDB = require('./configuration/dbase'); 
const { Server } = require("socket.io");
const http = require("http");
const Canvas = require("./WB_models/canvas_model");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;

const userRoutes = require("./WB_routes/user_routes");
const canvasRoutes = require("./WB_routes/canvas_routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/canvas", canvasRoutes);

connectToDB();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://whiteboard-tutorial-eight.vercel.app", "http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

// This middleware acts as a security guard for every new connection.
io.use((socket, next) => {
    const authHeader = socket.handshake.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new Error("Authentication Error: No token provided"));
    }
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        socket.userId = decoded.userId;
        next();
    } catch (error) {
        next(new Error("Authentication Error: Invalid token"));
    }
});

let canvasData = {};
const debounceTimers = new Map();

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id, "with User ID:", socket.userId);

    socket.on("joinCanvas", async ({ canvasId }) => {
        try {
            const userId = socket.userId;

            const canvas = await Canvas.findById(canvasId);

            if (!canvas || (String(canvas.owner) !== userId && !canvas.shared.includes(userId))) {
                console.log("Unauthorized access.");
                return socket.emit("authError", { message: "You are not authorized to join this canvas." });
            }

            socket.join(canvasId);
            console.log(`User ${userId} joined canvas ${canvasId}`);

            if (canvasData[canvasId]) {
                socket.emit("loadCanvas", canvasData[canvasId]);
            } else {
                socket.emit("loadCanvas", canvas.elements);
            }
        } catch (error) {
            console.error(error);
            socket.emit("canvasError", { message: "Unexpected error while joining canvas." });
        }
    });

    socket.on("drawingUpdate", async ({ canvasId, elements }) => {
        socket.to(canvasId).emit("receiveDrawingUpdate", elements);

        canvasData[canvasId] = elements;

        if (debounceTimers.has(canvasId)) {
            clearTimeout(debounceTimers.get(canvasId));
        }

        const timer = setTimeout(async () => {
            try {
                console.log(`Saving canvas ${canvasId} to DB...`);
                await Canvas.findByIdAndUpdate(canvasId, { elements });
                debounceTimers.delete(canvasId);
            } catch (error) {
                console.error("Error saving canvas to DB:", error);
            }
        }, 2000);

        debounceTimers.set(canvasId, timer);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(5000, () => console.log("Server running on port 5000"));