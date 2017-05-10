import webpack from 'webpack';

import getBabelPresets from './getBabelPresets';
import getModule from './getModule';
import getResolve from './getResolve';

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
  module: getModule(),
  resolve: getResolve(),
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
