const router = require('express').Router();
const passport = require('passport');

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/failure',
  successRedirect: 'http://localhost:3000'
}));

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/auth/failure',
  successRedirect: 'http://localhost:3000'
}));

// Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', {
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


