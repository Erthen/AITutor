const express = require("express");
const cors = require("cors");
const app = express();

// Allow frontend to talk to backend
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static("public"));

// CHAT API ROUTE
app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message || "No message received";

    // Temporary AI reply (for testing)
    const reply = "AI received: " + userMessage;

    return res.json({ reply });
});

// PORT (Render requirement)
const port = process.env.PORT || 10000;
app.listen(port, () => console.log("Server running on port " + port));
