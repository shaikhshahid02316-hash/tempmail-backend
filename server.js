const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

// Rate limiter
const limiter = require("./utils/rateLimiter");

app.use(cors());
app.use(limiter);

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "TempMail Backend Running",
    uptime: process.uptime()
  });
});

// Generate temporary email
app.get("/generate", async (req, res) => {
  try {

    const apiURL =
      "https://api.guerrillamail.com/ajax.php?f=get_email_address&ip=127.0.0.1&agent=Mozilla";

    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error("GuerrillaMail API failed");
    }

    const data = await response.json();

    res.json(data);

  } catch (error) {

    console.error("Email generation error:", error);

    // fallback email generator
    const random = Math.floor(Math.random() * 1000000);

    res.json({
      email_addr: "user" + random + "@tempmail.xyz"
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
