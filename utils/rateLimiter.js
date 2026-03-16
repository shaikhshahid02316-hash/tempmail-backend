const rateLimit = require("express-rate-limit");

// Smart traffic protection
const limiter = rateLimit({

  windowMs: 60 * 1000, // 1 minute window

  max: 120, // per IP max requests

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    status: 429,
    error: "Too many requests",
    message: "Server protection active. Please try again later."
  },

  handler: (req, res) => {
    console.log("⚠ Rate limit exceeded:", req.ip);

    res.status(429).json({
      success: false,
      message: "Too many requests from this IP",
      retryAfter: "60 seconds"
    });
  },

  skip: (req) => {
    // health check requests skip
    if (req.path === "/health") {
      return true;
    }
    return false;
  },

  keyGenerator: (req) => {
    return req.ip;
  }

});

module.exports = limiter;
