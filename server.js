const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const limiter = require("./utils/rateLimiter");
app.use(cors());
app.use(limiter);
app.get("/generate", async (req, res) => {
  try {
    const response = await fetch("https://api.guerrillamail.com/ajax.php?f=get_email_address");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json({
      email_addr: "user" + Date.now() + "@tempmail.xyz"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
