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
    try {
      return await search({ name });
    } catch (err) {
      console.error('Failed to fetch data from imdb', err);

      // Failing to find a media isn't critical
      if (err.message.startsWith('Movie not found!:')) {
        return [];
      }

      throw new Error(err.message);
    }
  }
};
