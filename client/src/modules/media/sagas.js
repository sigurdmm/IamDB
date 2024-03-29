import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS,
  SEARCH_MEDIA_REQUESTED,
  SEARCH_MEDIA_SUCCESS,
  SEARCH_MEDIA_FAILED,
  ADD_MEDIA_COMMENT_FAILED,
  ADD_MEDIA_COMMENT_SUCCESS,
  ADD_MEDIA_COMMENT_REQUESTED,
} from './constants';

import { addCommentToMedia, fetchMediaById, searchMediaByQuery } from './api';

function* fetchMedia(action) {
  const { id } = action.media;

  try {
    const media = yield call(fetchMediaById, id);

    // Catch errors in the response
    if (media.error) {
      yield put({ error: media.error, type: FETCH_MEDIA_DETAILS_FAILED });
      return;
    }

    // Failing to find a media, yields an error
    if (media.media === null) {
      yield put({ error: `Cannot find media with id: ${id}`, type: FETCH_MEDIA_DETAILS_FAILED });
      return;
    }

    yield put({ media: media.media, type: FETCH_MEDIA_DETAILS_SUCCESS });
  } catch (e) {
    yield put({ type: FETCH_MEDIA_DETAILS_FAILED, error: e.text || e.message });
  }
}
function* searchMedia(action) {
  const {
    query,
    type,
    limit,
    offset,
    sortField,
    sortDirection,
  } = action.query;

  try {
    const results = yield call(searchMediaByQuery,
      query,
      type,
      limit,
      offset,
      sortField,
      sortDirection);

    // Catch errors in the response
    if (results.error) {
      yield put({ error: results.error, type: SEARCH_MEDIA_FAILED });
      return;
    }

    yield put({
      metadata: {
        total: results.searchMedia.total || 0,
      },
      media: results.searchMedia.results,
      type: results.searchMedia.results.length > 0 ? SEARCH_MEDIA_SUCCESS : SEARCH_MEDIA_FAILED,
      error: results.searchMedia.results.length > 0 ? null : 'Cannot find media',
    });
  } catch (e) {
    console.error('Search failed on server', e);
    yield put({ type: SEARCH_MEDIA_FAILED, error: e.text || e.message });
  }
}

function* addComment(action) {
  const { mediaId, comment } = action;

  try {
    const media = yield call(addCommentToMedia, mediaId, comment);

    yield put({ media: media.addComment, type: ADD_MEDIA_COMMENT_SUCCESS });
  } catch (err) {
    console.error(`Could not add comment to media: ${mediaId}`, err);
    yield put({ type: ADD_MEDIA_COMMENT_FAILED, error: err.text || err.message });
  }
}

function* mediaSaga() {
  // Optionally could we use takeEvery, but we only care about the latest request
  yield takeLatest(FETCH_MEDIA_DETAILS_REQUESTED, fetchMedia);
  yield takeLatest(SEARCH_MEDIA_REQUESTED, searchMedia);
  yield takeLatest(ADD_MEDIA_COMMENT_REQUESTED, addComment);
}

export default mediaSaga;
