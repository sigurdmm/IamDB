const imdb = require('imdb-api');

const options = () => ({
  apiKey: process.env.OMDB_API_KEY || null,
  timeout: 3000
});

const get = fields => imdb.get(fields, options());

const search = (fields) => imdb.search(Object.assign(fields, {}), options());

module.exports = {
  async getById(id) {
    return get({ id });
  },
  async getByName(name) {
    return get({ name });
  },
  async searchByName(name) {
    return search({ name });
  }
};
