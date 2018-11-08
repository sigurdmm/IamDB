const Media = require('../../models/media');
const Actor = require('../../models/actor');
const { searchByName, getById } = require('../../utils/imdbApi');
const { buildRelaseDate, extractListOrStringAsList } = require('../../utils/valueHelpers');

const fetchMediaDetails = async (imdbMedia) => {
  try {
    return await getById(imdbMedia.imdbid);
  } catch (err) {
    console.error(`Failed to fetch details for media: ${imdbMedia.imdbid}`, err);
    // Ignore media we couldn't fetch
    return null;
  }
};

/**
 * Accepts some media from imdb,
 * and maps it to a Media object
 * @param {object} imdbMedia
 * @return {Media} Mapped model of the given media
 * */
const mapImdbToMedia = (imdbMedia) => {
  const {
    title,
    released,
    year,
    plot,
    director,
    actors,
    rating,
    imdbid,
    type,
    poster
  } = imdbMedia;

  const media = new Media();

  media.name = title;
  media.released = buildRelaseDate(year, released);
  media.description = !!plot && plot !== 'N/A' ? plot : null;
  media.director = !!director && director !== 'N/A' ? director : null;
  // Identify the actors, and map it into the Actor model
  media.actors = extractListOrStringAsList(actors, ', ').map(name => new Actor({ name }));
  media.rating = rating || 0.0;
  media.imdbid = imdbid;
  media.type = type;

  media.thumbnails = {
    small: poster && poster !== 'N/A' ? poster : null,
    large: null
  };

  return media;
};

/**
 * Will store all actors
 * into the database,
 * and place a reference into the media
 * */
const saveActor = async (media) => {
  for (let i = 0; i < media.actors.length; i += 1) {
    const actor = media.actors[i];
    // Reassign to assure _id is correct
    media.actors[i] = await Actor.findOneOrCreate({ name: actor.name }, actor);
  }

  return media;
};

const searchMedia = async ({ query, offset = 0, limit = 20 }) => {
  console.info(`[Search Media] query: ${query}, offset: ${offset}, limit: ${limit}`);
  if (query.length < 3) {
    throw new Error(`Search phrase is too short. Must be minimum 3 chars long, your's is ${query.length}`);
  }

  const foundMedia = await Media.textSearch(query, offset, limit);

  // Exit early if we found some data, or we risked
  // filtering out our stored data
  if (foundMedia.length > 2 || offset > 0 || limit < 1) {
    return foundMedia;
  }

  console.debug('Couldn\'t find any media locally, asking IMDB for data');

  const imdbMedia = await searchByName(query);

  if (!imdbMedia || !imdbMedia.results) {
    throw new Error(`Couldn't find any media with name: ${query}`);
  }

  const media = await Promise.all(imdbMedia
    .results
    // Keep only movie or series from results
    .filter(m => ['movie', 'series'].includes(m.type))
    // We can assume only the first 10 is relevant (and likely even fever)
    .slice(0, 25)
    .map(fetchMediaDetails)
  );

  // Remove any filtered out empty values, and map to Media model
  let mediaModels = media.filter(m => !!m).map(mapImdbToMedia);

  // Fetch and store actors in the database
  console.debug('Mapping actors for all media');
  mediaModels = await Promise.all(mediaModels.map(m => saveActor(m)));
  console.debug('Mapping completed');

  try {
    // Save all media
    await Promise.all(mediaModels.map(m => m.save()));
  } catch (saveErr) {
    console.error('Couldn\'t save media', saveErr);

    // Throw the error, if it's not 'duplicate key error'
    if (!saveErr.message.startsWith('E11000')) {
      throw saveErr;
    }
  }

  // Return the stored media
  return mediaModels;
};

module.exports = searchMedia;