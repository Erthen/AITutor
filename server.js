const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Serve Static Frontend
app.use(express.static("public"));

// CHAT API
app.post("/api/chat", (req, res) => {
    const userMessage = req.body.message || "No message received";
    const reply = "AI received: " + userMessage;
    res.json({ reply });
});

// Render Port
const port = process.env.PORT || 10000;
app.listen(port, () => console.log("Server running on port " + port));
