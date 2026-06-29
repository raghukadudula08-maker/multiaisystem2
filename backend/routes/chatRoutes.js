const express = require("express");
const router = express.Router();
const Chat = require("../models/chat.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.use(authMiddleware);

// GET all messages for a personality (only for logged-in user)
router.get("/:personalityId", async (req, res) => {
    try {
        const messages = await Chat.find({
            personalityId: req.params.personalityId,
            userId: req.userId
        }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST a new message
router.post("/", async (req, res) => {
    try {
        const { personalityId, role, content, time } = req.body;

        if (!personalityId || !role || !content) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        const newMessage = new Chat({
            userId: req.userId,
            personalityId,
            role,
            content,
            time
        });
        await newMessage.save();
        res.json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE all messages for a personality (only for logged-in user)
router.delete("/:personalityId", async (req, res) => {
    try {
        await Chat.deleteMany({
            personalityId: req.params.personalityId,
            userId: req.userId
        });
        res.json({ message: "Chat cleared" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;