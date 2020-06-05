import { combineReducers } from 'redux';
import navigation from './navigation';
import revenue from './revenue';

export const rootReducer = combineReducers({
  navigation,
  revenue,
});