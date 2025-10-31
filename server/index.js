require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('Mongo connected'))
  .catch(err => console.error(err));

// Passport config
require('./services/passport');

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// route for client to check current user
app.get('/api/current_user', (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: { id: req.user.id, displayName: req.user.displayName, provider: req.user.provider } });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));


