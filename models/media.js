const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  rating: { type: Number, default: 0.0 },
  imdbid: { type: String, unique: true, required: true },
  released: { type: Date, default: Date.now() },
  actors: { type: Array, default: [] },
  director: String,
  thumbnails: {
    small: String,
    large: String
  },
  type: { type: String, enum: ['movie', 'series'] }
});

MediaSchema.index({ name: 'text', description: 'text', director: 'text' });

const Media = mongoose.model('Media', MediaSchema);

Media.on('index', (err) => {
  if (err) {
    console.error('Failed to create index for Media', err);
    return;
  }

  console.debug('Indices for collection Media has been created');

  if (process.env.NODE_ENV === 'development') {
    Media.collection.getIndexes({ full: true })
      .then(indices => console.debug('Indices created', indices))
      .catch(console.error);
  }
});

module.exports = Media;
