import webpack from 'webpack';
import { Monitor } from 'forever-monitor';
import clearConsole from 'react-dev-utils/clearConsole';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';

import buildServerWebpackConfig from './webpack/buildServerWebpackConfig.dev';
import hasReact from './react/hasReact';
import hasRedux from './redux/hasRedux';
import { resolveAppPath, resolveDevStackPath } from './utils/pathResolvers';

const SERVER_BUNDLE_NAME = 'bundle.server.js';

const getEntryServerName = () => {
  if (!hasRedux()) {
    return resolveDevStackPath('src/servers/server.dev.js');
  }

  return resolveDevStackPath('src/servers/server.redux.dev.js');
};

export default () => {
  if (!hasReact()) {
    return false;
  }

  const compiler = webpack(buildServerWebpackConfig(SERVER_BUNDLE_NAME, getEntryServerName()));
  compiler.watch({}, () => {});

  let firstCompile = true;

  compiler.plugin('invalid', () => {
    clearConsole();
    console.log('Compiling...');
  });

  compiler.plugin('done', (stats) => {
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;

    clearConsole();

    if (isSuccessful) {
      console.log('Compiled successfully');
    }

    if (messages.errors.length) {
      console.error('Compiled with errors');
      messages.errors.forEach(error => console.error(error));
    }

    if (messages.warnings.length) {
      console.warn('Compiled with warnings');
      messages.warnings.forEach(warning => console.warn(warning));
    }

    if (isSuccessful && firstCompile) {
      const serverProcess = new Monitor(resolveDevStackPath(`dist/${SERVER_BUNDLE_NAME}`), {
        env: {
          ...process.env,
          NODE_PATH: resolveAppPath('node_modules')
        }
      });
      serverProcess.start();
      firstCompile = false;
    }
  });

  return true;
};
