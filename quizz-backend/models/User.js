const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  // Other fields...
});

// Use the existing model if it exists, otherwise create a new one
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;