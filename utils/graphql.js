const { buildSchema } = require('graphql');
const Media = require('../models/media');

const schema = buildSchema(`
  type Query {
    searchMedia(query: String!, offset: Int, limit: Int): [Media]
    media(id: String!): Media
  },
  type Mutation {
    createMedia(id: Int!, title: String!, rating: Float): Media
  },
  type Media {
    id: String!
    name: String!
    description: String
    rating: Float
    imdbUrl: String
  }
`);

const searchMedia = async ({ query, offset = 0, limit = 20 }) => {
  if (query.length < 3) {
    throw new Error(`Search phrase is too short. Must be 3 chars long, your's is ${query.length}`);
  }

  const foundMedia = await Media.find({ $text: { $search: query } }).skip(offset).limit(limit).exec();

  console.info(foundMedia);
  if (foundMedia.length < 1) {
    // TODO(fredrfli) Ask IMDB for the information, search on title
  }

  return foundMedia;
};

const getMedia = async (query, other) => {
  // console.info(query);
  console.info(other);

  const { id } = query;
  const media = await Media.findById(id);
  console.info(media);

  return media;
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
