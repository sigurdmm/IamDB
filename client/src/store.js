import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { isDev } from './config';

import rootReducer from './modules/rootReducer';
import runSagas from './modules/rootSagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk, sagaMiddleware];

if (isDev()) {
  console.info('Application running in development mode');
  // Logger is used to debug actions and state handling
  middleware.push(createLogger());
}

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
  );

  // Attach sagas to the middleware
  runSagas(sagaMiddleware);

  return store;
}
