import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_ACTOR_DETAILS_FAILED,
  FETCH_ACTOR_DETAILS_REQUESTED,
  FETCH_ACTOR_DETAILS_SUCCESS,
} from './constants';

import { fetchActorById } from './actorApi';

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
    yield put({ type: FETCH_ACTOR_DETAILS_FAILED, error: e.text || e.message });
  }
}

function* actorSaga() {
  // Optionally could we use takeEvery, but we only care about the latest request
  yield takeLatest(FETCH_ACTOR_DETAILS_REQUESTED, fetchActor);
}

export default actorSaga;
