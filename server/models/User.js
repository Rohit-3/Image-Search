const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  providerId: String,
  provider: String,
  displayName: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);


