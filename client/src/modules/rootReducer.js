import { combineReducers } from 'redux';

import mediaReducer from './media/reducer';
import actorReducer from './actor/actorReducer';

export default combineReducers({ media: mediaReducer, actor: actorReducer });
