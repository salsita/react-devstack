/* global window */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

const identity = value => value;

const getDevTools = () => {
  if (__BROWSER__ && process.env.NODE_ENV === 'development') {
    return window.devToolsExtension ? window.devToolsExtension() : identity;
  }

  return identity;
};

export default (root, reducers = {}, ...middlewares) => {
  const newReducers = reducers;
  newReducers.root = root;

  const store = createStore(
    combineReducers(newReducers),
    __BROWSER__ ? window.reduxState : undefined,
    compose(
      applyMiddleware(...middlewares),
      getDevTools()
    )
  );

  return store;
};
