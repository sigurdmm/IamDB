/**
 * Required to prevent error: regeneratorRuntime is not defined.
 * Solution given by [0], and must be imported BEFORE all imports.
 *
 * [0] https://github.com/redux-saga/redux-saga/issues/280#issuecomment-291133023
 * */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.less';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
