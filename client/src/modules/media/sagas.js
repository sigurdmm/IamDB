import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS,
  FETCH_ACTOR_DETAILS_FAILED,
  FETCH_ACTOR_DETAILS_REQUESTED,
  FETCH_ACTOR_DETAILS_SUCCESS,
  SEARCH_MEDIA_REQUESTED,
  SEARCH_MEDIA_SUCCESS,
  SEARCH_MEDIA_FAILED,
} from './constants';

import { fetchMediaById, searchMediaByQuery, fetchActorById } from './api';

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
    yield put({ type: FETCH_MEDIA_DETAILS_FAILED, error: e.message });
  }
}

function* fetchActor(action) {
  const { id } = action.actor;
  try {
    const actor = yield call(fetchActorById, id);
    if (actor.error) {
      yield put({ error: actor.error, type: FETCH_ACTOR_DETAILS_FAILED });
      return;
    }
    if (actor.getActor === null) {
      yield put({ error: `Cannot find actor with id: ${id}`, type: FETCH_ACTOR_DETAILS_FAILED });
      return;
    }
    yield put({ actor: actor.getActor, type: FETCH_ACTOR_DETAILS_SUCCESS });
  } catch (e) {
    yield put({ type: FETCH_ACTOR_DETAILS_FAILED, error: e.message });
  }
}


function* searchMedia(action) {
  const { query, type } = action.query;

  try {
    const results = yield call(searchMediaByQuery, query, type, 50, 0);

    // Catch errors in the response
    if (results.error) {
      yield put({ error: results.error, type: SEARCH_MEDIA_FAILED });
      return;
    }

    yield put({ media: results.searchMedia, type: SEARCH_MEDIA_SUCCESS });
  } catch (e) {
    yield put({ type: SEARCH_MEDIA_FAILED, error: e.message });
  }
}

function* mediaSaga() {
  // Optionally could we use takeEvery, but we only care about the latest request
  yield takeLatest(FETCH_MEDIA_DETAILS_REQUESTED, fetchMedia);
  yield takeLatest(SEARCH_MEDIA_REQUESTED, searchMedia);
  yield takeLatest(FETCH_ACTOR_DETAILS_REQUESTED, fetchActor);
}

export default mediaSaga;
