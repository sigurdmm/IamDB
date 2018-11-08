const Media = require('../../models/media');

const getMedia = async (query) => {
  const { id } = query;

  return await Media.findById(id).populate('actors').exec();
};

module.exports = getMedia;