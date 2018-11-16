const { buildSchema } = require('graphql');

const searchMedia = require('./searchMedia');
const getMedia = require('./getMedia');
const getActor = require('./getActor');
const addComment = require('./addComment');

/**
 * Builds the necessary Queryies, Mutations and Types
 * for the GraphQL application
 * */
const schema = buildSchema(`
  type Query {
    searchMedia(query: String!, offset: Int, limit: Int, sortOn: String, sortDirection: Int , type: String): SearchMetadata
    media(id: String!): Media
    getActor(id: String!): Actor
    searchActors(query: String!, offset: Int, limit: Int, sortOn: String): [Actor]
  },
  
  type Mutation {
    addComment(id: String!, comment: String!): Media!
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
  
  type Sort {
    field: String
    direction: Int
  }
  
  type SearchMetadata {
    limit: Int
    offset: Int
    sort: Sort
    type: String
    total: Int
    
    results: [Media]
  }
  
  type Comment {
    createdAt: String!
    text: String!
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
    comments: [Comment]
  }
`);

// Setup relation to Queries and Mutations,
// with the implemented functions
const rootValue = {
  searchMedia,
  addComment,
  getActor,
  media: getMedia,
};

module.exports = {
  schema,
  rootValue
};
