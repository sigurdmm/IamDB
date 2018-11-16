const imdb = require('imdb-api');

const options = () => ({
  apiKey: process.env.OMDB_API_KEY || null,
  timeout: 3000
});

const get = fields => imdb.get(fields, options());

/**
 * Runs a search to imdb, based on a field
 * */
const search = (fields) => imdb.search(Object.assign(fields, {}), options());

module.exports = {
  /**
   * Fetches details about some
   * media, using the imdb-id
   * @param {string} id Imdb-id
   * @return {Promise}
   * */
  async getById(id) {
    return get({ id });
  },
  /**
   * Gets some data from the name field
   * @param {string} name
   * */
  async getByName(name) {
    return get({ name });
  },
  /**
   * Searches imdb for a given name.
   * In return will we get some results with
   * a limited amount of details.
   * */
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
