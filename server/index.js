require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const privacyRoutes = require('./routes/privacy');
const termsRoutes = require('./routes/terms');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// CORS: allow client origin and credentials
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Sessions (for Passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

const mongoUri = process.env.MONGO_URI || '';
const looksLikeMongo = mongoUri.startsWith('mongodb://') || mongoUri.startsWith('mongodb+srv://');
if (looksLikeMongo) {
  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('Mongo connected'))
    .catch(err => console.error(err));
} else {
  console.warn('Mongo not configured. Set MONGO_URI to a valid mongodb:// or mongodb+srv:// URI.');
}

// Passport config
require('./services/passport');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/privacy', privacyRoutes);
app.use('/terms', termsRoutes);

// route for client to check current user
app.get('/api/current_user', (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: { id: req.user.id, displayName: req.user.displayName, provider: req.user.provider } });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));


