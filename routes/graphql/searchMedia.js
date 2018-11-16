const Media = require('../../models/media');
const Actor = require('../../models/actor');
const { searchPerson, getImageUrl } = require('../../utils/tmdbApi');
const { searchByName, getById } = require('../../utils/imdbApi');
const { buildReleaseDate, extractListOrStringAsList } = require('../../utils/valueHelpers');

/***
 * Fetches the missing details about some media,
 * by it's imdb-id. Includes fields like actor and thumbnails
 * @param {object} imdbMedia A media row, from the search results
 * @return {object|null}
 */
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

  // Manually paste in the values we want
  media.name = title;
  media.released = buildReleaseDate(year, released);
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
 * Searches TMDB and inserts more details about an actor
 * */
const findActorDetails = async (actor) => {
  let person = null;
  try {
    person = await searchPerson(actor.name);
  } catch(err) {
    console.error('Failed to find details about actor on TMDB', err);
  }

  if (!person) {
    // Set defaults
    actor.thumbnails = {
      small: null,
      large: null
    };
    actor.popularity = 0.0;

    return actor;
  }

  actor.thumbnails = {
    small: person.profile_path ? getImageUrl(person.profile_path) : null,
    large: null
  };
  actor.popularity = person.popularity;

  return actor;
};

/**
 * Will store all actors into the database,
 * and place a reference into the media.
 * Also fills inn more details about the actor from TMDB
 * */
const saveActor = async (media) => {
  for (let i = 0; i < media.actors.length; i += 1) {
    let actor = await Actor.findOne({ name: media.actors[i].name });

    // Actor already exists, jump to next actor
    if (actor !== null) {
      // Reassign to assure _id is correct
      media.actors[i] = actor;
      continue;
    }

    actor = await findActorDetails(media.actors[i]);

    // Since saving happens async, can we risk duplicates,
    // which throws errors.
    try {
      await actor.save();
    } catch(err) {
      // Pass the err along, if it is not duplicate key err
      if (!err.message.startsWith('E11000')) {
        console.error('Failed to save actor', err);
        throw err;
      }
    }

    // Reassign to assure _id is correct
    media.actors[i] = actor;
  }

  return media;
};

/**
 * Asks external services, like IMDB and TMDB,
 * for a certain movie or tv-show.
 * which it then will attempt to import into the database.
 * @param {string} query Same search query as on searchMedia
 * @return {object} The media details fetched from IMDB and TMDB
 * */
async function fetchAndSaveMedia(query) {
  const imdbMedia = await searchByName(query);

  if (!imdbMedia || !imdbMedia.results) {
    throw new Error(`Couldn't find any media with name: ${query}`);
  }

  const media = await Promise.all(imdbMedia
    .results
    // Keep only movie or series from results
    .filter(m => ['movie', 'series'].includes(m.type))
    // We can assume only the first 10 is relevant (and likely even fever)
    .slice(0, 30)
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

  return mediaModels;
}

/**
 * Searches after a certain type of media, based on the given fields.
 * If nothing is found, will it ask external sources for the given data
 * @return {object} the result object, containing the results and metadata
 * */
const searchMedia = async ({ query, offset = 0, limit = 20, sortOn = null, sortDirection = 1, type = null }) => {
  console.info(`[Search Media] query: ${query}, offset: ${offset}, limit: ${limit}`);
  if (query.length < 1) {
    throw new Error(`Search phrase is too short. Must be minimum 1 char long, your's is ${query.length}`);
  }

  let foundMedia = await Media.textSearch(
    query,
    offset,
    limit,
    {
      field: sortOn,
      direction: sortDirection
    },
    type
  );

  const { results } = foundMedia;

  // Exit early if we found some data,
  // or the current query has some values,
  // that would make it likely that no data will be retrieved
  if (results.length > 2 || offset > 0 || limit <= 2 || query.length < 4) {
    return foundMedia;
  }

  console.debug('Couldn\'t find any media locally, asking IMDB for data');

  // Attempt to import from external sources
  await fetchAndSaveMedia(query);

  // Do the search again.
  // This is to ensure the ranking and matching is deterministic
  // (search ranking from imdb is different from our database)
  foundMedia = await Media.textSearch(
    query,
    offset,
    limit,
    {
      field: sortOn,
      direction: sortDirection
    },
    type
  );

  // Return the stored media
  return foundMedia;
};

module.exports = searchMedia;
