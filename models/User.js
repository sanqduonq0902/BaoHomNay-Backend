const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin', 'editor', 'client'], default: 'client' },

  upvotedArticles:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  downvotedArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
