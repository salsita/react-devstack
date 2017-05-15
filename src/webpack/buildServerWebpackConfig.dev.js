import webpack from 'webpack';

import getCssLoaderQuery from './getCssLoaderQuery';
import getModule from './getModule';
import getResolve from './getResolve';
import { resolveDevStackPath, resolveAppPath } from '../utils/pathResolvers';
import getCommonJsModules from '../utils/getCommonJsModules';

const commonJsModules = getCommonJsModules(resolveAppPath('node_modules'));

const cssLoaders = [`css-loader/locals?${getCssLoaderQuery()}`];

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
  module: getModule(cssLoaders),
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' })
  ]
});
