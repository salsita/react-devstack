/* global window */
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { router5Middleware } from 'redux-router5';

import createReducer from './createReducer';

const identity = value => value;
const nullReturningReducer = () => null;
function* emptyGenerator() {}

const getDevTools = () => {
  if (__BROWSER__ && process.env.NODE_ENV === 'development') {
    return window.devToolsExtension ? window.devToolsExtension() : identity;
  }

  return identity;
};

const sagaMiddleware = createSagaMiddleware();

export default (rootReducer = nullReturningReducer, saga = emptyGenerator, router) => {
  const store = createStore(
    createReducer(rootReducer),
    __BROWSER__ ? window.reduxState : undefined,
    compose(
      applyMiddleware(
        sagaMiddleware,
        router5Middleware(router)
      ),
      getDevTools()
    )
  );

  const task = sagaMiddleware.run(saga);

  return { store, task };
};
