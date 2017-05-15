import webpack from 'webpack';

import getCssLoaderQuery from './getCssLoaderQuery';
import getModule from './getModule';
import getResolve from './getResolve';
import { resolveAppPath } from '../utils/pathResolvers';
import getCommonJsModules from '../utils/getCommonJsModules';

const commonJsModules = getCommonJsModules(resolveAppPath('node_modules'));

// asset-manifest.json is being added later in the compilation process
commonJsModules['./client/asset-manifest.json'] = 'commonjs ./client/asset-manifest.json';

const cssLoaders = [`css-loader/locals?${getCssLoaderQuery()}`];

export default entry => ({
  entry,
  target: 'node',
  externals: commonJsModules,
  output: {
    path: resolveAppPath('dist'),
    filename: 'server.js'
  },
  resolve: getResolve(),
  module: getModule(cssLoaders),
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
  ]
});
