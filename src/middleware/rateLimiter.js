const rateLimit = require('express-rate-limit');

// Login rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false
});

// Registration rate limiter
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 registration attempts per windowMs
  message: 'Too many accounts created, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false
});

// API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { loginLimiter, registerLimiter, apiLimiter }; 