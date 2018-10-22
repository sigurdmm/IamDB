const express = require('express');
const router = express.Router();

const createError = require('http-errors');

/* GET home page. */
router.get('', (req, res, next) => {
  console.log('hello world');
  res.send({ test: 'hello world' });
});


/**
 * 404 Handler for /api
 *
 * Use a custom 404 handler for the
 * */
router.use((req, res, next) => {
  console.debug(`No route for url: ${req.method} ${req.url}`);
  next(createError(404));
});

module.exports = router;
