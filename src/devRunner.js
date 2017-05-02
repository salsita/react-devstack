import webpack from 'webpack';
import spawn from 'cross-spawn';

import buildServerWebpackConfig from './webpack/buildServerWebpackConfig';
import { resolveDevStackPath } from './utils/pathResolvers';

const SERVER_BUNDLE_NAME = 'bundle.server.js';

export default () => {
  const compiler = webpack(buildServerWebpackConfig(SERVER_BUNDLE_NAME));

  let serverProcess;

  compiler.watch({}, () => {
    if (!serverProcess) {
      serverProcess = spawn(
        'node',
        [resolveDevStackPath(`dist/${SERVER_BUNDLE_NAME}`)],
        { stdio: 'inherit' }
      );
    }
  });
};
