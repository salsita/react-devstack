import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import buildClientWebpackConfig from '../webpack/buildClientWebpackConfig';

export default (server, clientEntry) => {
  const compiler = webpack(buildClientWebpackConfig(clientEntry));

  server.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    serverSideRender: true,
    noInfo: true,
    stats: {
      colors: true
    }
  }));

  server.use(webpackHotMiddleware(compiler));
};
