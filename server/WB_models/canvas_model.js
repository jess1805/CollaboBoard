const mongoose = require("mongoose");

const canvasSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shared: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: [] },
    elements: [{ type: mongoose.Schema.Types.Mixed }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Canvas", canvasSchema);