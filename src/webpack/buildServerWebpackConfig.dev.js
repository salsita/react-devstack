import webpack from 'webpack';

import getCssLoaderQuery from './getCssLoaderQuery';
import getModule from './getModule';
import getResolve from './getResolve';
import hasRedux from '../redux/hasRedux';
import hasRouting from '../redux/hasRouting';
import hasSaga from '../saga/hasSaga';
import { resolveDevStackPath, resolveAppPath } from '../utils/pathResolvers';
import getCommonJsModules from '../utils/getCommonJsModules';

const commonJsModules = getCommonJsModules(resolveAppPath('node_modules'));
// asset-manifest.json is being added later in the compilation process
commonJsModules['./client/asset-manifest.json'] = 'commonjs ./client/asset-manifest.json';

const cssLoaders = [`css-loader/locals?${getCssLoaderQuery()}`];
const fileLoaders = ['file-loader?emitFile=false&publicPath=/'];

const __HAS_REDUX__ = hasRedux();
const __HAS_ROUTING__ = hasRouting();
const __HAS_SAGA__ = hasSaga();

const plugins = [
  new webpack.NamedModulesPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
    __BROWSER__: 'false',
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

export default bundleName => ({
  entry: [
    'webpack/hot/poll?1000',
    resolveDevStackPath('src/server/server.js')
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
  module: getModule(cssLoaders, fileLoaders),
  plugins
});
