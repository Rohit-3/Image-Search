const router = require('express').Router();
const axios = require('axios');
const Search = require('../models/Search');
const User = require('../models/User');

// helper: require auth
function ensureAuth(req, res, next){
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// Top searches
router.get('/top-searches', async (req, res) => {
  try {
    const top = await Search.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    return res.json(top.map(t => ({ term: t._id, count: t.count })));
  } catch (e) {
    return res.json([]);
  }
});

// Search endpoint
router.post('/search', ensureAuth, async (req, res) => {
  const { term } = req.body;
  if (!term) return res.status(400).json({ error: 'term required' });

  try {
    await Search.create({ userId: req.user._id, term });
  } catch (e) {
    // ignore if DB not configured
  }

  const base = process.env.UNSPLASH_BASE_URL || 'https://api.unsplash.com';
  const url = `${base}/search/photos`;
  try {
    const response = await axios.get(url, {
      params: { query: term, per_page: 20, client_id: process.env.UNSPLASH_ACCESS_KEY },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        'Accept-Version': 'v1'
      }
    });
    res.json({ total: response.data.total, results: response.data.results });
  } catch (err) {
    const status = err.response && err.response.status ? err.response.status : 500;
    const detail = err.response && err.response.data ? err.response.data : { message: err.message };
    console.error('Unsplash error:', detail);
    if (status === 403) {
      return res.status(403).json({ error: 'Unsplash access denied', detail });
    }
    return res.status(500).json({ error: 'Unsplash error', detail });
  }
});

// User history
router.get('/history', ensureAuth, async (req, res) => {
  try {
    const history = await Search.find({ userId: req.user._id }).sort({ timestamp: -1 }).limit(100);
    return res.json(history);
  } catch (e) {
    return res.json([]);
  }
});

// User data deletion endpoint (required for Facebook App submission)
router.delete('/user-data', ensureAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Delete all search history for this user
    await Search.deleteMany({ userId });
    
    // Delete the user account
    await User.findByIdAndDelete(userId);
    
    // Logout the user
    req.logout(function(err) {
      if (err) console.error('Logout error:', err);
    });
    
    return res.json({ 
      success: true, 
      message: 'All user data has been permanently deleted' 
    });
  } catch (error) {
    console.error('Data deletion error:', error);
    return res.status(500).json({ 
      error: 'Failed to delete user data', 
      detail: error.message 
    });
  }
});

module.exports = router;


