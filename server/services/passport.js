const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user)).catch(done);
});

// Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id, provider: 'google' });
    if (!user) {
      user = await new User({
        providerId: profile.id,
        provider: 'google',
        displayName: profile.displayName,
        email: profile.emails && profile.emails[0] && profile.emails[0].value
      }).save();
    }
    done(null, user);
  } catch (err) { done(err); }
}));

// GitHub
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id, provider: 'github' });
    if (!user) {
      user = await new User({
        providerId: profile.id,
        provider: 'github',
        displayName: profile.displayName || profile.username,
        email: profile.emails && profile.emails[0] && profile.emails[0].value
      }).save();
    }
    done(null, user);
  } catch (err) { done(err); }
}));

// Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
    if (!user) {
      user = await new User({
        providerId: profile.id,
        provider: 'facebook',
        displayName: profile.displayName,
        email: profile.emails && profile.emails[0] && profile.emails[0].value
      }).save();
    }
    done(null, user);
  } catch (err) { done(err); }
}));


