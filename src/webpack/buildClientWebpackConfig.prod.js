import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';

import getBabelPresets from './getBabelPresets';
import getModule from './getModule';
import getResolve from './getResolve';
import { resolveAppPath } from '../utils/pathResolvers';

export default entry => ({
  devtool: 'source-map',
  entry,
  output: {
    path: resolveAppPath('dist/client'),
    filename: '[name].[chunkhash:8].min.js'
  },
  module: getModule(),
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
    })
  ]
});
