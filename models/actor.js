const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  thumbnails: {
    small: String,
    large: String
  },
  popularity: Number,
});

ActorSchema.index({ name: 'text' });

/**
 * Will first attempt to find an actor based on the query,
 * or if not create an instance
 * */
ActorSchema.statics.findOneOrCreate = async function findOneOrCreate(query, actor) {
  let foundActor = await this.findOne(query).exec();

  if (foundActor !== null) {
    return foundActor;
  }
  try {
    await actor.save();
  } catch (e) {
    console.error('Failed to create actor', e);
    // Actor was actually inserted somewhere else
    if (e.message.startsWith('E11000')) {
      return foundActor;
    }

    throw e;
  }

  return actor;
};

ActorSchema.statics.textSearch = async function textSearch(query, offset = 0, limit = 100) {
  return this
    // Search uses MongoDB's build in features, such as stopword removing and stemming
    // https://docs.mongodb.com/manual/reference/operator/query/text/#match-operation
    .find({ $text: { $search: query } })

    // .populate('actors')
    .skip(offset)
    // Allow modification of limit, but no more than 100 at a time
    .limit(limit < 100 ? limit : 100)
    .exec();
};

const Actor = mongoose.model('Actor', ActorSchema);

Actor.on('index', (err) => {
  if (err) {
    console.error('Failed to create index for Actor', err);
    return;
  }

  console.debug('Indices for Actor has been created');

  if (process.env.NODE_ENV === 'development') {
    Actor.collection.getIndexes({ full: true })
      .then(indices => console.debug('Indices created', indices))
      .catch(console.error);
  }
});

module.exports = Actor;
