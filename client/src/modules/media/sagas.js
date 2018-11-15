import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS,
  SEARCH_MEDIA_REQUESTED,
  SEARCH_MEDIA_SUCCESS,
  SEARCH_MEDIA_FAILED,
} from './constants';

import { fetchMediaById, searchMediaByQuery } from './api';

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
    sort,
  } = action.query;

  try {
    const results = yield call(searchMediaByQuery, query, type, limit, offset, sort);

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
      type: SEARCH_MEDIA_SUCCESS,
    });
  } catch (e) {
    console.error('Search failed on server', e);
    yield put({ type: SEARCH_MEDIA_FAILED, error: e.text || e.message });
  }
}

function* mediaSaga() {
  // Optionally could we use takeEvery, but we only care about the latest request
  yield takeLatest(FETCH_MEDIA_DETAILS_REQUESTED, fetchMedia);
  yield takeLatest(SEARCH_MEDIA_REQUESTED, searchMedia);
}

export default mediaSaga;
