import 'universal-fetch';

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import { END } from 'redux-saga';

import enrichClientBundleWithHotReloading from './enrichClientBundleWithHotReloading';
import enrichProductionStaticFileServing from './enrichProductionStaticFileServing';
import exitWhenError from './exitWhenError';
import htmlTemplate from '../htmlTemplate';
import createStore from '../redux/createStore';
import createRouter from '../router/createRouter';
import { isNotFoundRoute } from '../selectors';

import Root from 'app/components/Root';

exitWhenError();

const NOT_FOUND_CODE = 404;
const OK_CODE = 200;
const ERROR_CODE = 500;

const getJsAndCssBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    return { js: 'bundle.js' };
  }

  const manifest = require('./client/asset-manifest.json');
  return { js: manifest['main.js'], css: manifest['main.css'] };
};

const server = express();

if (process.env.NODE_ENV === 'development') {
  enrichClientBundleWithHotReloading(server);
} else {
  enrichProductionStaticFileServing(server);
}

const { js, css } = getJsAndCssBundle();
const templateProvider = htmlTemplate(js, css);
server.get('*', (req, res) => {
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
  const { store, task } = createStore(reducer, saga, router);

  const sendResponse = () => {
    const state = store.getState();
    const found = routes ? !isNotFoundRoute(state) : true;

    try {
      res
        .status(found ? OK_CODE : NOT_FOUND_CODE)
        .send(templateProvider(renderToString(
          <Provider store={store}>
            <RouterProvider router={router}>
              <Root />
            </RouterProvider>
          </Provider>
        ), store.getState()));
    } catch (ex) {
      console.error(ex);

      res
        .status(ERROR_CODE)
        .send(`<h1>Exception</h1><h2>${ex.message}</h2><pre>${ex.stack}</pre>`);
    }
  };

  router.start(req.originalUrl, (error) => {
    if (error) {
      throw error;
    } else if (process.env.DISABLE_SSR) {
      if (process.env.NODE_ENV === 'production') {
        console.warn(
          'You have selected to disable server side rendering by providing DISABLE_SSR env variable. ' +
          'This is however generally not good idea in NODE_ENV=production, because of unexpected behaviour. ' +
          'DISABLE_SSR env variable is meant to be used just for easier debugging in development.'
        );
      }

      sendResponse();
    } else {
      store.dispatch(END);
      task.done.then(sendResponse);
    }
  });
});

server.listen(process.env.PORT || 3000);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('app/components/Root');

  if (__HAS_REDUX__) {
    module.hot.accept('app/reducers/rootReducer');
  }

  if (__HAS_SAGA__) {
    module.hot.accept('app/sagas/rootSaga');
  }
}
