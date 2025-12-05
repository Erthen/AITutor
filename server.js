import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// Serve Public HTML/CSS/JS
app.use(express.static("public"));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await client.responses.create({
      model: "gpt-5.1-mini",
      input: userMessage,
    });

    const botReply = response.output_text;

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.json({ reply: "AI Error! Check API Key or Server." });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
