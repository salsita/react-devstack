import express from 'express';

import enrichClientBundleWithHotReloading from './enrichClientBundleWithHotReloading';
import enrichProductionStaticFileServing from './enrichProductionStaticFileServing';
import enrichServerSideRenderingHandler from './enrichServerSideRenderingHandler';
import exitWhenError from './exitWhenError';
import htmlTemplate from '../htmlTemplate';

exitWhenError();

const getJsAndCssBundle = () => {
  if (process.env.NODE_ENV === 'development') {
    return { js: 'bundle.js' };
  }

  const manifest = require('./client/asset-manifest.json');
  return { js: manifest['main.js'], css: manifest['main.css'] };
};

export default (provider, clientEntry) => {
  const server = express();

  if (process.env.NODE_ENV === 'development') {
    enrichClientBundleWithHotReloading(server, clientEntry);
  } else {
    enrichProductionStaticFileServing(server);
  }

  const { js, css } = getJsAndCssBundle();
  enrichServerSideRenderingHandler(server, provider, htmlTemplate(js, css));
  server.listen(process.env.PORT || 3000);

  return server;
};
