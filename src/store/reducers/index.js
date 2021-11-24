import { combineReducers } from 'redux';
import navigation from './navigation';
import members from './members';
import orders from './orders';
import security from './security';
import refData from './refData';
import reports from './reports';
import global from './global';
import cardTags from './cardTags';
import adAnalytics from './adAnalytics';

export const rootReducer = combineReducers({
  navigation,
  members,
  orders,
  security,
  refData,
  reports,
  global,
  cardTags,
  adAnalytics,
});