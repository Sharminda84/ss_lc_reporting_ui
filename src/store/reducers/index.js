import { combineReducers } from 'redux';
import navigation from './navigation';
import revenue from './revenue';
import memebrs from './members';

export const rootReducer = combineReducers({
  navigation,
  revenue,
  memebrs,
});