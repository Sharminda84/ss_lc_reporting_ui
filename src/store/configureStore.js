import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import * as sagaWatches from './sagas';

let store;

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const enhancer = applyMiddleware(sagaMiddleware);
  store = createStore(rootReducer, {}, enhancer);
  Object.keys(sagaWatches).forEach(watcher => sagaMiddleware.run(sagaWatches[watcher]));
  return store;
};

export const dispatch = action => store && store.dispatch(action);