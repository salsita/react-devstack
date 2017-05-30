import { realpathSync } from 'fs';

import { resolveDevStackPath, resolveAppPath } from '../utils/pathResolvers';

const plugins = [
  'transform-runtime',
  ['transform-object-rest-spread', { useBuiltIns: true }],
  ['transform-class-properties', { useBuiltIns: true }]
];

if (process.env.NODE_ENV === 'development') {
  plugins.push(resolveAppPath('node_modules/react-hot-loader/babel'));
}

export default (cssLoaders, fileLoaders) => ({
  rules: [{
    test: /\.js$/,
    include: [
      realpathSync(resolveAppPath('src')),
      realpathSync(resolveDevStackPath('src'))
    ],
    use: [{
      loader: 'babel-loader',
      options: {
        presets: [
          ['es2015', { modules: false }],
          'babel-preset-react'
        ],
        plugins
      }
    }]
  }, {
    test: /\.css$/,
    include: realpathSync(resolveAppPath('src')),
    use: cssLoaders
  }, {
    test: /\.svg|\.ico$/,
    include: realpathSync(resolveAppPath('src')),
    use: fileLoaders
  }]
});
