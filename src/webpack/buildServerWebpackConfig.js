import fs from 'fs';
import webpack from 'webpack';

import getBabelPresets from './getBabelPresets';
import getModule from './getModule';
import getResolve from './getResolve';
import { resolveDevStackPath, resolveAppPath } from '../utils/pathResolvers';

const getCommonJsModules = path =>
  fs
    .readdirSync(path)
    .filter(module => ['.bin'].indexOf(module) === -1)
    .reduce((memo, module) => ({
      ...memo,
      [module]: `commonjs ${module}`
    }), {});

const commonJsModules = getCommonJsModules(resolveAppPath('node_modules'));

export default (bundleName, entry) => ({
  entry: [
    'webpack/hot/poll?1000',
    entry
  ],
  target: 'node',
  externals: commonJsModules,
  output: {
    path: resolveDevStackPath('dist'), // TODO: do we really want to keep transpiled stuff inside the library?
                                       // Wouldn't it rather make sense to keep this in app folder?
                                       // Is it possible to purge it from time to time?
    filename: bundleName
  },
  resolve: getResolve(),
  module: getModule(),
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
