
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// PUBLIC folder ko serve karo
app.use(express.static(path.join(__dirname, "public")));

// Index.html load
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Tutor route
app.post("/teach", async (req, res) => {
  res.json({
    video_url: "https://example.com/dummy.mp4"
  });
});

// Start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

// yahan se dusari coding hai
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });

  } catch (err) {
    res.json({ answer: "Server Error: " + err.message });
  }
});

app.listen(10000, () => console.log("Server running on port 10000"));



