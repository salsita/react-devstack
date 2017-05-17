import chalk from 'chalk';
import webpack from 'webpack';
import { Monitor } from 'forever-monitor';
import clearConsole from 'react-dev-utils/clearConsole';
import openBrowser from 'react-dev-utils/openBrowser';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import detect from '@timer/detect-port';

import buildServerWebpackConfig from './webpack/buildServerWebpackConfig.dev';
import hasReact from './react/hasReact';
import hasRedux from './redux/hasRedux';
import hasRouting from './router/hasRouting';
import { resolveAppPath, resolveDevStackPath } from './utils/pathResolvers';

const SERVER_BUNDLE_NAME = 'bundle.server.js';
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const getEntryServerName = () => {
  if (!hasRedux()) {
    return resolveDevStackPath('src/servers/server.js');
  }

  if (!hasRouting()) {
    return resolveDevStackPath('src/servers/server.redux.js');
  }

  return resolveDevStackPath('src/servers/server.reduxRouter.js');
};

export default () => {
  if (!hasReact()) {
    return false;
  }

  detect(DEFAULT_PORT, HOST).then((port) => {
    if (port === DEFAULT_PORT) {
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
          console.log(chalk.green.bold('Compiled successfully'));
        }

        if (messages.errors.length) {
          console.error(chalk.red.bold('Compiled with errors'));
          messages.errors.forEach(error => console.error(error));
        }

        if (messages.warnings.length) {
          console.warn(chalk.blue.bold('Compiled with warnings'));
          messages.warnings.forEach(warning => console.warn(warning));
        }

        if (isSuccessful && firstCompile) {
          const serverProcess = new Monitor(resolveDevStackPath(`dist/${SERVER_BUNDLE_NAME}`), {
            env: {
              ...process.env,
              NODE_PATH: resolveAppPath('node_modules'),
              PORT: DEFAULT_PORT
            }
          });
          serverProcess.start();
          firstCompile = false;
          openBrowser(`http://localhost:${DEFAULT_PORT}`);
        }
      });
    } else {
      console.log(chalk.red('There\'s a running process at port', chalk.bold(DEFAULT_PORT), 'Please, terminate the process first.'));
      process.exit(0);
    }
  });

  return true;
};
