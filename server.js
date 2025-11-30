const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// PUBLIC folder
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
