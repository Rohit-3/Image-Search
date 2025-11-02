const router = require('express').Router();
const passport = require('passport');

function ensureProviderConfigured(provider) {
  return (req, res, next) => {
    const trim = (v) => typeof v === 'string' ? v.trim() : '';
    const hasGoogle = trim(process.env.GOOGLE_CLIENT_ID) && trim(process.env.GOOGLE_CLIENT_SECRET) && trim(process.env.GOOGLE_CALLBACK_URL);
    const hasGithub = trim(process.env.GITHUB_CLIENT_ID) && trim(process.env.GITHUB_CLIENT_SECRET) && trim(process.env.GITHUB_CALLBACK_URL);
    const hasFacebook = trim(process.env.FACEBOOK_CLIENT_ID) && trim(process.env.FACEBOOK_CLIENT_SECRET) && trim(process.env.FACEBOOK_CALLBACK_URL);
    const ok = provider === 'google' ? hasGoogle : provider === 'github' ? hasGithub : hasFacebook;
    if (!ok) return res.status(503).send(`${provider} auth not configured`);
    next();
  }
}

// quick status for debugging
router.get('/status', (req, res) => {
  const trim = (v) => typeof v === 'string' ? v.trim() : '';
  res.json({
    google: {
      id: !!trim(process.env.GOOGLE_CLIENT_ID),
      secret: !!trim(process.env.GOOGLE_CLIENT_SECRET),
      callback: trim(process.env.GOOGLE_CALLBACK_URL)
    },
    github: {
      id: !!trim(process.env.GITHUB_CLIENT_ID),
      secret: !!trim(process.env.GITHUB_CLIENT_SECRET),
      callback: trim(process.env.GITHUB_CALLBACK_URL)
    },
    facebook: {
      id: !!trim(process.env.FACEBOOK_CLIENT_ID),
      secret: !!trim(process.env.FACEBOOK_CLIENT_SECRET),
      callback: trim(process.env.FACEBOOK_CALLBACK_URL)
    }
  });
});

// Google
router.get('/google', ensureProviderConfigured('google'), passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', ensureProviderConfigured('google'), passport.authenticate('google', {
  failureRedirect: '/auth/failure',
  successRedirect: 'http://localhost:3000'
}));

// GitHub
router.get('/github', ensureProviderConfigured('github'), passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', ensureProviderConfigured('github'), passport.authenticate('github', {
  failureRedirect: '/auth/failure',
  successRedirect: 'http://localhost:3000'
}));

// Facebook
router.get('/facebook', ensureProviderConfigured('facebook'), passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', ensureProviderConfigured('facebook'), passport.authenticate('facebook', {
  failureRedirect: '/auth/failure',
  successRedirect: 'http://localhost:3000'
}));

router.get('/failure', (req, res) => res.send('Auth failed'));

router.get('/logout', (req, res) => {
  req.logout(function(err){
    if(err) console.error(err);
    res.redirect('http://localhost:3000');
  });
});

module.exports = router;


