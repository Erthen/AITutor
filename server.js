import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
    try {
        const userMsg = req.body.message;

        const response = await client.responses.create({
            model: "gpt-5.1",
            input: userMsg
        });

        // Extract Text from response
        let aiText = response.output_text;

        if (!aiText) {
            aiText = "No response text found";
        }

        return res.json({ reply: aiText });

    } catch (err) {
        console.error(err);
        return res.json({ reply: "Server error occurred!" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
