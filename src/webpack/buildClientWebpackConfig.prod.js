import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import getCssLoaderQuery from './getCssLoaderQuery';
import getModule from './getModule';
import getResolve from './getResolve';
import hasRedux from '../redux/hasRedux';
import hasRouting from '../router/hasRouting';
import hasSaga from '../saga/hasSaga';
import { resolveAppPath, resolveDevStackPath } from '../utils/pathResolvers';

const cssLoaders = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: `css-loader?${getCssLoaderQuery()}`
});
const fileLoaders = ['file-loader'];

const __HAS_REDUX__ = hasRedux();
const __HAS_ROUTING__ = hasRouting();
const __HAS_SAGA__ = hasSaga();

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    __BROWSER__: 'true',
    __HAS_REDUX__,
    __HAS_ROUTING__,
    __HAS_SAGA__
  }),
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
];

if (!__HAS_REDUX__) {
  plugins.push(new webpack.IgnorePlugin(/app\/reducers\/rootReducer/));
}

if (!__HAS_ROUTING__) {
  plugins.push(new webpack.IgnorePlugin(/app\/routing\/routes\//));
}

if (!__HAS_SAGA__) {
  plugins.push(new webpack.IgnorePlugin(/app\/sagas\/rootSaga\//));
}


export default () => ({
  devtool: 'source-map',
  entry: resolveDevStackPath('src/client/client.js'),
  output: {
    path: resolveAppPath('dist/client'),
    filename: '[name].[chunkhash:8].min.js'
  },
  module: getModule(cssLoaders, fileLoaders),
  resolve: getResolve(),
  plugins
});
