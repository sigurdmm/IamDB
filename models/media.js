const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  rating: { type: Number, default: 0.0 },
  imdbid: { type: String, unique: true, required: true },
  released: { type: Date, default: Date.now() },
  actors: { type: Array, default: [] },
  director: { type: String },
  thumbnails: {
    small: String,
    large: String
  },
  type: { type: String, enum: ['movie', 'series'] }
});

MediaSchema.index(
  {
    name: 'text',
    description: 'test',
    director: 'text'
  },
  {
    weights: {
      name: 5,
      description: 1,
      director: 2
    }
  });

module.exports = mongoose.model('Media', MediaSchema);
