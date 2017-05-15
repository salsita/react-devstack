import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import getCssLoaderQuery from './getCssLoaderQuery';
import getModule from './getModule';
import getResolve from './getResolve';
import { resolveAppPath } from '../utils/pathResolvers';

const cssLoaders = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: `css-loader?${getCssLoaderQuery()}`
});

export default entry => ({
  devtool: 'source-map',
  entry,
  output: {
    path: resolveAppPath('dist/client'),
    filename: '[name].[chunkhash:8].min.js'
  },
  module: getModule(cssLoaders),
  resolve: getResolve(),
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new ExtractTextPlugin('[name].[chunkhash:8].min.css')
  ]
});
