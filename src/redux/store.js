/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
  })
  : compose;

const loggerMaddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log(store.getState());
  return result;
};
export const store = createStore(reducer, composeEnhancers(applyMiddleware(loggerMaddleware, thunk)));
