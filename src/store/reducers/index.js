import { combineReducers } from 'redux';
import navigation from './navigation';
import revenue from './revenue';
import members from './members';
import orders from './orders';
import security from './security';

export const rootReducer = combineReducers({
  navigation,
  revenue,
  members,
  orders,
  security,
});