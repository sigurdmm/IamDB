const { buildSchema } = require('graphql');
const Media = require('../models/media');
const { searchByName, getById } = require('./imdbApi');
const { buildRelaseDate, extractListOrStringAsList } = require('./valueHelpers');

const fetchMediaDetails = async (imdbMedia) => {
  try {
    return await getById(imdbMedia.imdbid);
  } catch (err) {
    console.error(`Failed to fetch details for media: ${imdbMedia.imdbid}`, err);
    // Ignore media we couldn't fetch
    return null;
  }
};

const mapImdbToMedia = (imdbMedia) => {
  const {
    title,
    released,
    year,
    plot,
    director,
    actors,
    rating,
    imdbid,
    type,
    poster
  } = imdbMedia;

  const media = new Media();

  media.name = title;
  media.released = buildRelaseDate(year, released);
  media.description = !!plot && plot !== 'N/A' ? plot : null;
  media.director = !!director && director !== 'N/A' ? director : null;
  // Actors can either be a csv string, or an array of strings
  media.actors = extractListOrStringAsList(actors, ', ');
  media.rating = rating || 0.0;
  media.imdbid = imdbid;
  media.type = type;

  media.thumbnails = {
    small: poster && poster !== 'N/A' ? poster : null,
    large: null
  };

  return media;
};


const schema = buildSchema(`
  type Query {
    searchMedia(query: String!, offset: Int, limit: Int): [Media]
    media(id: String!): Media
  },
  type Mutation {
    createMedia(id: Int!, title: String!, rating: Float): Media
  },
  type Thumbnail {
    small: String
    large: String
  }
  
  type Media {
    id: String!
    name: String!
    description: String
    rating: Float
    actors: [String]!
    director: String
    imdbid: String
    released: String
    thumbnails: Thumbnail
    type: String
  }
`);

const searchMedia = async ({ query, offset = 0, limit = 20 }) => {
  console.info(`[Search Media] query: ${query}, offset: ${offset}, limit: ${limit}`);
  if (query.length < 3) {
    throw new Error(`Search phrase is too short. Must be 3 chars long, your's is ${query.length}`);
  }

  const foundMedia = await Media
    // Search uses MongoDB's build in features, such as stopword removing and stemming
    // https://docs.mongodb.com/manual/reference/operator/query/text/#match-operation
    .find({ $text: { $search: query } })
    .skip(offset)
    // Allow modification of limit, but no more than 100 at a time
    .limit(limit < 100 ? limit : 100)
    .exec();

  // Exit early if we found some data, or we risked
  // filtering out our stored data
  if (foundMedia.length > 0 || offset > 0) {
    return foundMedia;
  }

  console.debug('Couldn\'t find any media locally, asking IMDB for data');

  let imdbMedia = null;
  try {
    imdbMedia = await searchByName(query);
  } catch (err) {
    console.error('Failed to fetch api data', err);
    throw new Error(err.message);
  }

  if (!imdbMedia || !imdbMedia.results) {
    throw new Error(`Couldn't find any media with name: ${query}`);
  }

  // Async call to fetch detailed information about the top 5 media

  const media = await Promise.all(imdbMedia
    .results
    // Keep only movie or series from results
    .filter(m => ['movie', 'series'].includes(m.type))
    // We can assume only the first 10 is relevant (and likely even fever)
    .slice(0, 10)
    .map(fetchMediaDetails)
  );

  const mediaModels = media
    // Remove any filtered out values
    .filter(m => !!m)
    .map(mapImdbToMedia);

  try {
    // Save all media
    await Promise.all(mediaModels.map(m => m.save()));
  } catch (saveErr) {
    console.error('Couldn\'t save media', saveErr);

    // Throw the error, if it's not 'duplicate key error'
    if (!saveErr.message.startsWith('E11000')) {
      throw saveErr;
    }
  }

  // Return the stored media
  return mediaModels;
};

const getMedia = async (query) => {
  const { id } = query;

  return await Media.findById(id);
};

const createMedia = (args) => {
  // eslint-disable-next-line no-console
  console.info(args);
};

const rootValue = {
  searchMedia,
  createMedia,
  media: getMedia,
};

module.exports = {
  schema,
  rootValue
};
