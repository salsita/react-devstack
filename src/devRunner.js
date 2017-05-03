import webpack from 'webpack';
import spawn from 'cross-spawn';

import buildServerWebpackConfig from './webpack/buildServerWebpackConfig';
import hasRedux from './redux/hasRedux';
import { resolveAppPath, resolveDevStackPath } from './utils/pathResolvers';

const SERVER_BUNDLE_NAME = 'bundle.server.js';

const getEntryServerName = () => {
  if (!hasRedux()) {
    return resolveDevStackPath('src/servers/server.dev.js');
  } else {
    return resolveDevStackPath('src/servers/server.redux.dev.js');
  }
};

export default () => {
  const compiler = webpack(buildServerWebpackConfig(SERVER_BUNDLE_NAME, getEntryServerName()));

  let serverProcess;
  const ENV = process.env;

  compiler.watch({}, () => {
    if (!serverProcess) {
      serverProcess = spawn(
        'node',
        [resolveDevStackPath(`dist/${SERVER_BUNDLE_NAME}`)],
        {
          env: {
            ...ENV,
            NODE_PATH: resolveAppPath('node_modules')
          },
          stdio: 'inherit'
        }
      );
    }
  });
};
