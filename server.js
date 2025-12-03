// server.js (replace entire file with this)
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files from public/
app.use(express.static(path.join(__dirname, "public")));

// Chat route -> forwards to OpenAI
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: "No message" });

    // Use your OpenAI API key from env
    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) return res.status(500).json({ error: "Missing OPENAI_API_KEY" });

    // Prepare request to OpenAI Chat Completions
    const payload = {
      model: "gpt-4o-mini", // or choose model you have access to
      messages: [{ role: "user", content: userMessage }]
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const text = await r.text();
      console.error("OpenAI error:", r.status, text);
      return res.status(502).json({ error: "OpenAI error", detail: text });
    }

    const data = await r.json();
    // pick model response text (safety: check structure)
    const answer = data?.choices?.[0]?.message?.content ?? "No answer from model";

    return res.json({ reply: answer });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error", detail: err.message });
  }
});

// Fallback index route (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server (Render uses process.env.PORT)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on port", PORT));
