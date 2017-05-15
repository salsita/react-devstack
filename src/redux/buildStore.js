/* global window */

import { createStore } from 'redux';

export default (reducer) => {
  const store = createStore(reducer, typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : value => value);
  return store;
};
