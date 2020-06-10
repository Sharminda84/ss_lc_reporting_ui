import { combineReducers } from 'redux';
import navigation from './navigation';
import revenue from './revenue';
import members from './members';
import orders from './orders';

export const rootReducer = combineReducers({
  navigation,
  revenue,
  members,
  orders,
});