require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const securityHeaders = require('./middleware/securityHeaders');
const { apiLimiter } = require('./middleware/rateLimiter');
const mongoSanitize = require('express-mongo-sanitize');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(securityHeaders);
app.use(express.json());
app.use(mongoSanitize());
app.use(apiLimiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// JWT Secret
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cities', require('./routes/cities'));
app.use('/api/metrics', require('./routes/metrics'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 