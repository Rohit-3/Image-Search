const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const getEnv = (k) => {
  const v = process.env[k];
  return typeof v === 'string' ? v.trim() : '';
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user)).catch(done);
});

// Google (register only if env is present)
if (getEnv('GOOGLE_CLIENT_ID') && getEnv('GOOGLE_CLIENT_SECRET') && getEnv('GOOGLE_CALLBACK_URL')) {
  console.log('[auth] Registering Google strategy');
  passport.use(new GoogleStrategy({
    clientID: getEnv('GOOGLE_CLIENT_ID'),
    clientSecret: getEnv('GOOGLE_CLIENT_SECRET'),
    callbackURL: getEnv('GOOGLE_CALLBACK_URL')
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
} else {
  console.warn('[auth] Google strategy not registered: missing env', {
    id: !!getEnv('GOOGLE_CLIENT_ID'),
    secret: !!getEnv('GOOGLE_CLIENT_SECRET'),
    cb: getEnv('GOOGLE_CALLBACK_URL')
  });
}

// GitHub
if (getEnv('GITHUB_CLIENT_ID') && getEnv('GITHUB_CLIENT_SECRET') && getEnv('GITHUB_CALLBACK_URL')) {
  console.log('[auth] Registering GitHub strategy');
  passport.use(new GitHubStrategy({
    clientID: getEnv('GITHUB_CLIENT_ID'),
    clientSecret: getEnv('GITHUB_CLIENT_SECRET'),
    callbackURL: getEnv('GITHUB_CALLBACK_URL')
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
} else {
  console.warn('[auth] GitHub strategy not registered: missing env', {
    id: !!getEnv('GITHUB_CLIENT_ID'),
    secret: !!getEnv('GITHUB_CLIENT_SECRET'),
    cb: getEnv('GITHUB_CALLBACK_URL')
  });
}

// Facebook
if (getEnv('FACEBOOK_CLIENT_ID') && getEnv('FACEBOOK_CLIENT_SECRET') && getEnv('FACEBOOK_CALLBACK_URL')) {
  console.log('[auth] Registering Facebook strategy');
  passport.use(new FacebookStrategy({
    clientID: getEnv('FACEBOOK_CLIENT_ID'),
    clientSecret: getEnv('FACEBOOK_CLIENT_SECRET'),
    callbackURL: getEnv('FACEBOOK_CALLBACK_URL'),
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
} else {
  console.warn('[auth] Facebook strategy not registered: missing env', {
    id: !!getEnv('FACEBOOK_CLIENT_ID'),
    secret: !!getEnv('FACEBOOK_CLIENT_SECRET'),
    cb: getEnv('FACEBOOK_CALLBACK_URL')
  });
}


