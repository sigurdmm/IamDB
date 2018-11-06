const { buildSchema } = require('graphql');

const searchMedia = require('./searchMedia');
const getMedia = require('./getMedia');

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
  
  type Actor {
    id: String!
    name: String!
  }
  
  type Media {
    id: String!
    name: String!
    description: String
    rating: Float
    actors: [Actor]!
    director: String
    imdbid: String
    released: String
    thumbnails: Thumbnail
    type: String
  }
`);


const rootValue = {
  searchMedia,
  media: getMedia,
};

module.exports = {
  schema,
  rootValue
};
