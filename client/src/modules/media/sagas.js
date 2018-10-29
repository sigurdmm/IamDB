import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_MEDIA_DETAILS_FAILED,
  FETCH_MEDIA_DETAILS_REQUESTED,
  FETCH_MEDIA_DETAILS_SUCCESS
} from './constants';

import { fetchMediaById } from './api';

function* fetchMedia(action) {
  const { id } = action.media;

  try {
    const media = yield call(fetchMediaById, id);

    // Catch errors in the response
    if (media.error) {
      yield put({ error: media.error, type: FETCH_MEDIA_DETAILS_FAILED});
      return;
    }

    yield put({ media, type: FETCH_MEDIA_DETAILS_SUCCESS });
  } catch (e) {
    yield put({ type: FETCH_MEDIA_DETAILS_FAILED, error: e.message });
  }
}

function* mediaSaga() {
  // Optionally could we use takeEvery, but we only care about the latest request
  yield takeLatest(FETCH_MEDIA_DETAILS_REQUESTED, fetchMedia);
}

export default mediaSaga;
