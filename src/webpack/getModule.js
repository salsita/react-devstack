import { resolveDevStackPath, resolveAppPath } from '../utils/pathResolvers';

export default () => ({
  rules: [{
    test: /\.js$/,
    // include: [
    //   resolveAppPath('src'),
    //   resolveDevStackPath('src')
    // ],
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
  }]
});
