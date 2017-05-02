import React from 'react';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { renderToString } from 'react-dom/server';

import Root from 'app/components/Root'; // eslint-disable-line

import htmlTemplate from './htmlTemplate';
import buildClientWebpackConfig from './webpack/buildClientWebpackConfig';

const BUNDLE_NAME = 'client.js';

if (module.hot) {
  module.hot.accept('app/components/Root');
}

const server = express();
const compiler = webpack(buildClientWebpackConfig(BUNDLE_NAME));

server.use(webpackDevMiddleware(compiler, {
  publicPath: '/',
  serverSideRender: true,
  noInfo: true,
  stats: {
    colors: true
  }
}));
server.use(webpackHotMiddleware(compiler));

server.get('*', (req, res) => {
  res.send(htmlTemplate(`/${BUNDLE_NAME}`, renderToString(<Root />)));
});
server.listen(3001);
