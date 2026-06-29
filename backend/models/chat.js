const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    personalityId: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    time: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;