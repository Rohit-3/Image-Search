const router = require('express').Router();
const axios = require('axios');
const Search = require('../models/Search');

// helper: require auth
function ensureAuth(req, res, next){
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// Top searches
router.get('/top-searches', async (req, res) => {
  const top = await Search.aggregate([
    { $group: { _id: "$term", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.json(top.map(t => ({ term: t._id, count: t.count })));
});

// Search endpoint
router.post('/search', ensureAuth, async (req, res) => {
  const { term } = req.body;
  if (!term) return res.status(400).json({ error: 'term required' });

  await Search.create({ userId: req.user._id, term });

  const url = `${process.env.UNSPLASH_BASE_URL}/search/photos`;
  try {
    const response = await axios.get(url, {
      params: { query: term, per_page: 20 },
      headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
    });
    res.json({ total: response.data.total, results: response.data.results });
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Unsplash error' });
  }
});

// User history
router.get('/history', ensureAuth, async (req, res) => {
  const history = await Search.find({ userId: req.user._id }).sort({ timestamp: -1 }).limit(100);
  res.json(history);
});

module.exports = router;


