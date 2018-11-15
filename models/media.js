const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  rating: { type: Number, default: 0.0 },
  imdbid: { type: String, unique: true, required: true },
  released: { type: Date, default: Date.now() },
  actors: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: 'Actor' }],
  director: String,
  comments: [{
    createdAt: { type: Date, default: Date.now() },
    text: { type: String, required: true }
  }],
  thumbnails: {
    small: String,
    large: String
  },
  type: { type: String, enum: ['movie', 'series'] }
});

MediaSchema.index({ name: 'text', director: 'text' });

MediaSchema.statics.textSearch = async function textSearch(query, offset = 0, limit = 100, sort = null, type = null) {
  const search = { $text: { $search: query } };

  if (type) {
    console.info(`Filter on: ${type}`);
    search.type = type;
  }

  const actuallLimit = limit < 100 ? limit : 100;

  const searchBuilder = this
  // Search uses MongoDB's build in features, such as stopword removing and stemming
  // https://docs.mongodb.com/manual/reference/operator/query/text/#match-operation
    .find(search)
    // Fill inn relation with actors
    .populate('actors')
    .skip(offset)
    // Allow modification of limit, but no more than 100 at a time
    .limit(actuallLimit);

  if (sort) {
    console.info(`Sorting on : ${sort.field} ${sort.direction}`);
    searchBuilder.sort({ [sort.field]: sort.direction });
  }

  // Count is used for in the metadata,
  // to tell the client how many matches the query gave
  const total = await this.count(search).exec();
  const results = await searchBuilder.exec();

  // Format the results, to match the GraphQL type
  return {
    sort,
    offset,
    total,
    type,
    results,
    limit: actuallLimit
  };
};

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
