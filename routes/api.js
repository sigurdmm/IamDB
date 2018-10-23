const express = require('express');
const router = express.Router();

// const createError = require('http-errors');

const expressGraphql = require('express-graphql');
const { schema, rootValue } = require('../utils/graphql');

/* GET home page. */
router.use('', expressGraphql({
  schema,
  rootValue,
  graphiql: true
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
