import fs from 'fs';
import webpack from 'webpack';

import getBabelPresets from './getBabelPresets';
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
    `${resolveDevStackPath('node_modules/webpack/hot/poll')}?1000`,
    entry
  ],
  target: 'node',
  externals: commonJsModules,
  output: {
    path: resolveDevStackPath('dist'),
    filename: bundleName
  },
  resolve: {
    modules: [
      resolveAppPath('node_modules')
    ],
    alias: {
      app: resolveAppPath('src'),
      'webpack-dev-middleware': resolveDevStackPath('node_modules/webpack-dev-middleware'),
      'webpack-hot-middleware': resolveDevStackPath('node_modules/webpack-hot-middleware')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: getBabelPresets()
        }
      }
    }]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});
