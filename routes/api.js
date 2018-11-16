const express = require('express');
const router = express.Router();

const expressGraphql = require('express-graphql');
const { schema, rootValue } = require('./graphql');

/**
 * Delegate the root request to GraphQL
 * */
router.use('', expressGraphql({
  schema,
  rootValue,
  graphiql: true,
  formatError: (error) => {
    console.error('Error in GraphQL query', error);

    return {
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path
    };
  }
}));

module.exports = router;
