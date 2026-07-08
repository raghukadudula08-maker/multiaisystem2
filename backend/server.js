const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected successfully!"))
    .catch(err => console.log("❌ DB Error:", err));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("🚀 Backend running on port " + PORT);
});