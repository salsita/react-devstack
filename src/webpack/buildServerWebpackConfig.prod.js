import webpack from 'webpack';

import getCssLoaderQuery from './getCssLoaderQuery';
import getModule from './getModule';
import getResolve from './getResolve';
import hasRedux from '../redux/hasRedux';
import hasRouting from '../router/hasRouting';
import hasSaga from '../saga/hasSaga';
import getCommonJsModules from '../utils/getCommonJsModules';

import { resolveAppPath, resolveDevStackPath } from '../utils/pathResolvers';

const commonJsModules = getCommonJsModules(resolveAppPath('node_modules'));

// asset-manifest.json is being added later in the compilation process
commonJsModules['./client/asset-manifest.json'] = 'commonjs ./client/asset-manifest.json';

const cssLoaders = [`css-loader/locals?${getCssLoaderQuery()}`];
const fileLoaders = ['file-loader?emitFile=false'];

const __HAS_REDUX__ = hasRedux();
const __HAS_ROUTING__ = hasRouting();
const __HAS_SAGA__ = hasSaga();

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
    __BROWSER__: 'false',
    __HAS_ROUTING__,
    __HAS_SAGA__,
    __HAS_REDUX__
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
  entry: resolveDevStackPath('src/server/server.js'),
  target: 'node',
  externals: commonJsModules,
  output: {
    path: resolveAppPath('dist'),
    filename: 'server.js'
  },
  resolve: getResolve(),
  module: getModule(cssLoaders, fileLoaders),
  plugins
});
