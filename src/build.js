import webpack from 'webpack';

import buildServerWebpackConfig from './webpack/buildServerWebpackConfig.prod';
import buildClientWebpackConfig from './webpack/buildClientWebpackConfig.prod';
import hasReact from './react/hasReact';
import { resolveDevStackPath } from './utils/pathResolvers';

const compileWithWebpack = config => new Promise((res, rej) => {
  webpack(config, (err, { compilation: { errors, warnings } }) => {
    if (err) {
      rej(err);
    } else {
      res({ errors, warnings });
    }
  });
});

export default async () => {
  try {
    if (!hasReact()) {
      return false;
    }

    const [
      { errors: serverCompilationErrors, warnings: serverCompilationWarnings },
      { errors: clientCompilationErrors, warnings: clientCompilationWarnings }
    ] = await Promise.all([
      compileWithWebpack(buildServerWebpackConfig(resolveDevStackPath('src/server/server.js'))),
      compileWithWebpack(buildClientWebpackConfig(resolveDevStackPath('src/client/client.js')))
    ]);

    if (serverCompilationErrors.length) {
      console.log(`Server compilation failed with ${serverCompilationErrors.length} errors`);
    }
    serverCompilationErrors.forEach(error => console.error(error));

    if (serverCompilationWarnings.length) {
      console.log(`Server compilation ended up with ${serverCompilationErrors.length} warnings`);
    }
    serverCompilationWarnings.forEach(warning => console.warn(warning));

    if (clientCompilationErrors.length) {
      console.log(`Client compilation failed with ${clientCompilationErrors.length} errors`);
    }
    serverCompilationErrors.forEach(error => console.error(error));

    if (clientCompilationWarnings.length) {
      console.log(`Client compilation ended up with ${clientCompilationWarnings.length} warnings`);
    }
    serverCompilationWarnings.forEach(warning => console.warn(warning));

    if (!serverCompilationErrors.length &&
        !serverCompilationWarnings.length &&
        !clientCompilationErrors.length &&
        !clientCompilationWarnings.length
      ) {
      console.log('Compilation has been successful start the application with: npm start');
    }
  } catch (ex) {
    console.error(ex);
  }

  return true;
};
