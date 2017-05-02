import webpack from 'webpack';

import getBabelPresets from './getBabelPresets';
import { resolveDevStackPath, resolveAppPath } from '../utils/pathResolvers';

export default bundleName => ({
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    resolveDevStackPath('src/clientMain.js')
  ],
  output: {
    path: '/',
    filename: bundleName,
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: getBabelPresets(),
          plugins: [resolveDevStackPath('node_modules/react-hot-loader/babel')]
        }
      }]
    }]
  },
  resolve: {
    alias: {
      app: resolveAppPath('src'),
      'react-hot-loader': resolveDevStackPath('node_modules/react-hot-loader'),
      'webpack-hot-middleware': resolveDevStackPath('node_modules/webpack-hot-middleware')
    }
  },
  resolveLoader: {
    modules: [resolveDevStackPath('node_modules')]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
