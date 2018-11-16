const Media = require('../../models/media');

/**
 * Fetches information about some media,
 * and the related actors
 * */
const getMedia = async (query) => {
  const { id } = query;

  return await Media.findById(id).populate('actors').exec();
};

module.exports = getMedia;
