import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// ===== AI CHAT ROUTE =====
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "Hello";

    const response = await client.responses.create({
      model: "gpt-5.1",
      input: userMessage
    });

    const aiText = response.output[0].content[0].text;

    res.json({ reply: aiText });

  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "AI error" });
  }
});

// ===== START SERVER =====
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
