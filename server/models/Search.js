const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  term: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Search', searchSchema);


