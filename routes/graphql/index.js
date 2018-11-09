const { buildSchema } = require('graphql');

const searchMedia = require('./searchMedia');
const getMedia = require('./getMedia');

const searchActors = require('./searchActors');

const schema = buildSchema(`
  type Query {
    searchMedia(query: String!, offset: Int, limit: Int): [Media]
    media(id: String!): Media
    searchActors(query: String!, offset: Int, limit: Int): [Actor]
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
    media: [Media]
    popularity: Float
    thumbnails: Thumbnail
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
  searchActors,
  media: getMedia,
};

module.exports = {
  schema,
  rootValue
};
