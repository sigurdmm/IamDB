const axios = require('axios');

const apiHost = 'https://api.themoviedb.org/3/';
const personUrl = `${apiHost}search/person/`;

const getKey = () => {
  if (!process.env.THEMOVIEDB_API_KEY) {
    throw new Error('Cannot find environment variable THEMOVIEDB_API_KEY. Please add it to your project');
  }

  return process.env.THEMOVIEDB_API_KEY;
};

const searchPerson = async (query) => {
  const key = getKey();
  const url = `${personUrl}?api_key=${key}&query=${encodeURIComponent(query)}`;
  console.debug(`TMDB url: ${url}`);

  const res = await axios.get(url);
  console.debug(`Status: ${res.status}`);

  if (!res || !res.data) {
    return null;
  }

  const { data } = res;

  if (!data || !data.results || data.results.length <= 0) {
    return null;
  }

  return data.results[0];
};

module.exports = {
  searchPerson,
  getImageUrl: (uri, size = 'w300') => `https://image.tmdb.org/t/p/${size}${uri}`,
};
