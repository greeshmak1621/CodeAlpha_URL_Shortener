const express = require("express");
const { nanoid } = require("nanoid");

const app = express();
app.use(express.json());

const urls = {};

app.get("/", (req, res) => {
  res.send("URL Shortener Working");
});

app.post("/shorten", (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "URL required" });
  }

  const shortCode = nanoid(6);
  urls[shortCode] = longUrl;

  res.json({
    shortUrl: `http://localhost:3000/${shortCode}`,
  });
});

app.get("/:code", (req, res) => {
  const longUrl = urls[req.params.code];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
