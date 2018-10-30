const { buildSchema } = require('graphql');
const Media = require('../models/media');
const { searchByName } = require('./imdbApi');

const buildRelaseDate = (year, released = null) => {
  if (released) {
    return new Date(released);
  }

  const date = new Date();
  date.setFullYear(year, 0, 0);

  return date;
};

const mapImdbToMedia = (imdbMedia) => {
  const { title, released, year, plot, director, actors, rating, imdbid, type, poster } = imdbMedia;

  const media = new Media();

  media.name = title;
  media.released = buildRelaseDate(year, released);
  media.description = plot;
  media.director = director;
  media.actors = actors ? actors.split(', ') : [];
  media.rating = rating || 0.0;
  media.imdbid = imdbid;
  media.type = type;

  media.thumbnail = {
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
    imdbid: String
    thumbnail: Thumbnail
  }
`);

const searchMedia = async ({ query, offset = 0, limit = 20 }) => {
  if (query.length < 3) {
    throw new Error(`Search phrase is too short. Must be 3 chars long, your's is ${query.length}`);
  }

  const foundMedia = await Media.find({ $text: { $search: query } }).skip(offset).limit(limit).exec();

  if (foundMedia.length < 1) {
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

    const media = imdbMedia.results
      .map(mapImdbToMedia)
      // Keep only movie or series from results
      .filter(m => ['movie', 'series'].includes(m.type));

    // Save all media
    await Promise.all(media.map(m => m.save()));

    // Return the stored media
    return media;
  }

  return foundMedia;
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
