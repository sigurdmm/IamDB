const Actor = require('../../models/actor');

async function searchActors({ query, offset = 0, limit = 50 }) {
  console.info(`[Search Media] query: ${query}, offset: ${offset}, limit: ${limit}`);
  if (query.length < 3) {
    throw new Error(`Search phrase is too short. Must be minimum 3 chars long, your's is ${query.length}`);
  }

  const results = await Actor.textSearch(query, offset, limit);

  if (results.length < 1) {
    console.debug(`Found no actor for query: ${query}`);
    return [];
  }

  return results;
}

module.exports = searchActors;
