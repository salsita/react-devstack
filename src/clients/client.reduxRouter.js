/* eslint-env browser */

import 'react-hot-loader/patch';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { router5Middleware } from 'redux-router5';

import buildStore from '../redux/buildStore';
import createRootReducerWithRouter from '../redux/createRootReducerWithRouter';
import createRouter from '../router/createRouter';

import Root from 'app/components/Root';
import rootReducer from 'app/reducers/rootReducer';

const router = createRouter();
const store = buildStore(createRootReducerWithRouter(rootReducer), router5Middleware(router));

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
  module.hot.accept('app/reducers/rootReducer', () => {
    store.replaceReducer(createRootReducerWithRouter(rootReducer));
  });
}
