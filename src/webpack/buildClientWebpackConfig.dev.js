import webpack from 'webpack';

import getCssLoaderQuery from './getCssLoaderQuery';
import getModule from './getModule';
import getResolve from './getResolve';
import hasRedux from '../redux/hasRedux';
import hasRouting from '../router/hasRouting';
import hasSaga from '../saga/hasSaga';
import { resolveDevStackPath } from '../utils/pathResolvers';

const cssLoaders = ['style-loader', `css-loader?${getCssLoaderQuery()}`];
const fileLoaders = ['file-loader'];

const __HAS_REDUX__ = hasRedux();
const __HAS_ROUTING__ = hasRouting();
const __HAS_SAGA__ = hasSaga();

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
    __BROWSER__: 'true',
    __HAS_REDUX__,
    __HAS_ROUTING__,
    __HAS_SAGA__
  })
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
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    resolveDevStackPath('src/client/client.js'),
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: getModule(cssLoaders, fileLoaders),
  resolve: getResolve(),
  plugins
});
