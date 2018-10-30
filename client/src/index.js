/**
 * Required to prevent error: regeneratorRuntime is not defined.
 * Solution given by [0], and must be imported BEFORE all imports.
 *
 * [0] https://github.com/redux-saga/redux-saga/issues/280#issuecomment-291133023
 * */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.less';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);
