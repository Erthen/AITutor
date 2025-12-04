import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Chat Route
app.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    // SEND REQUEST TO OPENAI
    const response = await client.responses.create({
      model: "gpt-5.1",
      input: message
    });

    // SAFE PARSING - 100% working
    let reply = "";

    if (response.output_text) {
      reply = response.output_text;
    } else if (response.output && response.output[0]?.content[0]?.text) {
      reply = response.output[0].content[0].text;
    } else {
      reply = "No response received.";
    }

    res.json({ reply });

  } catch (err) {
    console.error("OPENAI ERROR:", err);
    res.status(500).json({ reply: "Server error. Please try again." });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
