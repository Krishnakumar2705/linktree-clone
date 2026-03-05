const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Link Schema
const LinkSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  linkTitle: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  clickHistory: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    ip: String,
    userAgent: String
  }]
});

module.exports = Link = mongoose.model('link', LinkSchema);