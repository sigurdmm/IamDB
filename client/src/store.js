import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { isDev } from './config';

import rootReducer from './modules/rootReducer';

const middleware = [thunk];

if (isDev()) {
  console.info('Application running in development mode');
  middleware.push(createLogger());
}

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware),
  );
}
