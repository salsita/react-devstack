/* eslint-env browser */

import 'react-hot-loader/patch';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import createReducer from '../redux/createReducer';
import createStore from '../redux/createStore';
import createRouter from '../router/createRouter';

import Root from 'app/components/Root';

let reducer;
let routes;
let saga;

if (__HAS_REDUX__) {
  reducer = require('app/reducers/rootReducer').default;
}

if (__HAS_ROUTING__) {
  routes = require('app/routing/routes').default;
}

if (__HAS_SAGA__) {
  saga = require('app/sagas/rootSaga').default;
}

const router = createRouter(routes);
const { store } = createStore(reducer, saga, router);

const doRender = (Cmp) => {
  render((
    <AppContainer>
      <Provider store={store}>
        <Cmp />
      </Provider>
    </AppContainer>
  ), document.getElementById('root'));
};

router.start(window.reduxState.router.route, () => doRender(Root));

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('app/components/Root', () => doRender(Root));

  if (reducer) {
    module.hot.accept('app/reducers/rootReducer', () => {
      store.replaceReducer(createReducer(require('app/reducers/rootReducer').default));
    });
  }
}
