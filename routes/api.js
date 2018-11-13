const express = require('express');
const router = express.Router();

const expressGraphql = require('express-graphql');
const { schema, rootValue } = require('./graphql');

/* GET home page. */
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

/**
 * 404 Handler for /api
 *
 * Use a custom 404 handler for the
 * */
// router.use((req, res, next) => {
//   console.debug(`No route for url: ${req.method} ${req.url}`);
//   next(createError(404));
// });

module.exports = router;
