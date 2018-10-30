const imdb = require('imdb-api');

const options = () => {
  console.debug(`Registered OMDB api-key: ${process.env.OMDB_API_KEY}`);

  return {
    apiKey: process.env.OMDB_API_KEY || null,
    timeout: 30000
  };
};

const get = fields => imdb.get(fields, options());

const search = (fields) => imdb.search(Object.assign(fields, {}), options());

module.exports = {
  async getByName(name) {
    return get({ name });
  },
  async searchByName(name) {
    return search({ name });
  }
};
