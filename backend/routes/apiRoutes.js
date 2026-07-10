const express = require("express");
const router = express.Router();

const GROQ_KEY = process.env.GROQ_API_KEY;
const CRICKET_KEY = process.env.CRICKET_API_KEY;
const WEATHER_KEY = process.env.WEATHER_API_KEY;
const NEWS_KEY = process.env.NEWS_API_KEY;

router.post("/ai", async (req, res) => {
    try {
        const { messages, max_tokens, temperature } = req.body;
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + GROQ_KEY,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages,
                max_tokens: max_tokens || 90,
                temperature: temperature || 0.85,
                stream: false,
            }),
        });
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/ai/stream", async (req, res) => {
    try {
        const { messages, max_tokens, temperature } = req.body;
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + GROQ_KEY,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages,
                max_tokens: max_tokens || 90,
                temperature: temperature || 0.85,
                stream: false,
            }),
        });
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content || "";
        res.setHeader("Content-Type", "text/event-stream");
        res.write("data: " + JSON.stringify({
            choices: [{ delta: { content: content } }]
        }) + "\n\n");
        res.write("data: [DONE]\n\n");
        res.end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/cricket", async (req, res) => {
    try {
        const response = await fetch(
            "https://api.cricapi.com/v1/currentMatches?apikey=" + CRICKET_KEY + "&offset=0"
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/weather", async (req, res) => {
    try {
        const city = req.query.city || "Hyderabad";
        const response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + WEATHER_KEY + "&units=metric"
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/news", async (req, res) => {
    try {
        const query = req.query.q || "india";
        const response = await fetch(
            "https://newsdata.io/api/1/news?apikey=" + NEWS_KEY + "&q=" + query + "&language=en&size=5"
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;