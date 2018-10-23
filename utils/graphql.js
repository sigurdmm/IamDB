const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    media(id: Int!): Media
    medias(title: String): [Media]
  },
  type Mutation {
    createMedia(id: Int!, title: String!, rating: Float): Media
  },
  type Media {
    id: Int
    title: String!
    description: String
    rating: Float
    imdbUrl: String
  }
`);

const allMedia = [
  {
    id: 1,
    title: 'Test test',
    description: 'lorem lipsum dolor sit amed',
    rating: 8.9,
    imdbUrl: 'https://imdb.com/52'
  }
];

const getMedia = ({ id }) => allMedia.find(m => m.id === id);

const createMedia = (args) => {
  // eslint-disable-next-line no-console
  console.log(args);
};

const rootValue ={
  createMedia,
  media: getMedia,
  medias: () => []
};

module.exports = {
  schema,
  rootValue
};
