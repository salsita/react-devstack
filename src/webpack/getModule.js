import { realpathSync } from 'fs';

import { resolveDevStackPath, resolveAppPath } from '../utils/pathResolvers';

export default cssLoaders => ({
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
        plugins: process.env.NODE_ENV === 'development' ?
          [resolveAppPath('node_modules/react-hot-loader/babel')] :
          []
      }
    }]
  }, {
    test: /\.css$/,
    include: [
      realpathSync(resolveAppPath('src')),
      realpathSync(resolveDevStackPath('src'))
    ],
    use: cssLoaders
  }]
});
