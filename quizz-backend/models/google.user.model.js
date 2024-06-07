const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
  email: String,
  password: String,
  status: Number,
  isDelete: Boolean
});

const GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema);

module.exports = GoogleUser;