const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) return res.json({ reply: "Message missing" });

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) return res.json({ reply: "API key missing" });

    // Call OpenAI Responses API
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",    // use the model you have access to
        input: userMessage
      })
    });

    const data = await response.json();

    console.log("OpenAI raw response:", data); // DEBUG

    // FIX: Extract correct text
    const aiReply =
      data.output_text ||
      data?.response_text ||
      data?.choices?.[0]?.message?.content ||
      "No response text found";

    return res.json({ reply: aiReply });

  } catch (err) {
    console.error("Server error:", err);
    res.json({ reply: "Server error: " + err.message });
  }
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Server running on", PORT));
