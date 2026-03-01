const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/generate", async (req, res) => {
  try {
    const response = await fetch("https://api.guerrillamail.com/ajax.php?f=get_email_address");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.json({
      email_addr: "fallback" + Math.floor(Math.random() * 10000) + "@tempmail.xyz"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
