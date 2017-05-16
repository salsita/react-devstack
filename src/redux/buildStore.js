/* global window */
import { applyMiddleware, compose, createStore } from 'redux';

const identity = value => value;

const getDevTools = () => {
  if (__BROWSER__ && process.env.NODE_ENV === 'development') {
    return window.devToolsExtension ? window.devToolsExtension() : identity;
  }

  return identity;
};

export default (reducer, ...middlewares) => {
  const store = createStore(
    reducer,
    __BROWSER__ ? window.reduxState : undefined,
    compose(
      applyMiddleware(...middlewares),
      getDevTools()
    )
  );

  return store;
};
