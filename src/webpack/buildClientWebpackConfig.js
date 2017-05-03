import webpack from 'webpack';

import getBabelPresets from './getBabelPresets';
import { resolveDevStackPath, resolveAppPath } from '../utils/pathResolvers';

export default entry => ({
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    entry
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
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
    modules: [
      resolveAppPath('node_modules'),
      resolveDevStackPath('node_modules')
    ],
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        REDUX: JSON.stringify(process.env.REDUX)
      }
    })
  ]
});
