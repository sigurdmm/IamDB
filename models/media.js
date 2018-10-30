const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, default: 0.0 },
  imdbUrl: String,
  released: { type: Date, default: Date.now() },
  actors: { type: Array, default: [] },
  director: { type: String },
  thumbnails: {
    small: String,
    large: String
  },
  type: { type: String, enum: ['movie', 'tv-show'] }
});

MediaSchema.index({ name: 'text', description: 'test', director: 'text' });

module.exports = mongoose.model('Media', MediaSchema);
