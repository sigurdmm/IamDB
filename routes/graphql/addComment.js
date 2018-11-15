const Media = require('../../models/media');

/**
 * Prevents any potentially duplicated comments from being saved.
 * @param {Array<object>} comments list of comments
 * @param {string} comment The new comment
 * @throws {Error} Thrown if duplicates is found
 * */
function rejectIfDuplicates(comments, comment) {
  for (let item of comments) {
    if (item.text === comment) {
      throw new Error('Media already contains an identical comment. Please don\'t include any duplicates!');
    }
  }
}

/**
 * Appends a new comment to some media.
 * No authentication is done. However,
 * we do require a min length and prevent direct duplicated comments
 * @return {Media}
 * */
async function addComment({ id, comment }) {
  if (!comment) {
    throw new Error('Comment cannot be empty!');
  }

  const lengthThreshold = 10;
  if (comment.length < lengthThreshold) {
    throw new Error(`Comments cannot be less than ${lengthThreshold} characters, your's was: ${comment.length}`);
  }

  const media = await Media.findById(id);

  if (media === null) {
    throw new Error(`Cannot find any media with id: ${id}`);
  }

  if (!media.comments) {
    media.comments = [];
  }

  rejectIfDuplicates(media.comments, comment);

  const commentModel = {
    text: comment,
    createdAt: new Date()
  };

  media.comments.push(commentModel);
  await media.save();

  return media;
}

module.exports = addComment;
