const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/hello", (req, res) => {
    res.send({ message: "AI Tutor Backend Working!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});
