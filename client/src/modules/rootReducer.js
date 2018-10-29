import { combineReducers } from 'redux';

import mediaReducer from './media/reducer';

export default combineReducers({ media: mediaReducer });
