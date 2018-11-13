const Media = require('../../models/media');
const Actor = require('../../models/actor');

async function getActor({ id }) {
  const actor = await Actor.findById(id).exec();

  if (!actor) {
    throw new Error(`Cannot find any actor with id: ${id}`);
  }

  // Find all media for which the actor has been casted in
  const media = await Media.find({ actors: { $elemMatch: { _id: actor._id } } }).exec();
  actor.media = media;

  return actor;
}

module.exports = getActor;
