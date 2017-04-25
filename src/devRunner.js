import webpack from 'webpack';
import { resolve } from 'path';
import fs from 'fs';
import spawn from 'cross-spawn';

const getCommonJsModules = path =>
  fs
    .readdirSync(path)
    .filter(module => ['.bin'].indexOf(module) === -1)
    .reduce((memo, module) => ({
      ...memo,
      [module]: `commonjs ${module}`
    }), {});

const SERVER_BUNDLE_NAME = 'bundle.server.js';

export default (appRoot) => {
  const resolveAppPath = path => resolve(appRoot, path);
  const resolveLocalPath = path => resolve(__dirname, path);
  const resolveLocalNodeDep = dependency => require.resolve(dependency);

  const commonJsModules = getCommonJsModules(resolveAppPath('node_modules'));

  const compiler = webpack({
    entry: [
      `${resolveLocalNodeDep('webpack/hot/poll')}?1000`,
      resolveLocalPath('devServer.js')
    ],
    target: 'node',
    externals: commonJsModules,
    output: {
      path: resolveLocalPath('../dist'),
      filename: SERVER_BUNDLE_NAME
    },
    resolve: {
      modules: [
        resolveAppPath('node_modules'),
        resolveLocalPath('../node_modules')
      ],
      alias: {
        app: resolveAppPath('src')
      }
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: resolveLocalNodeDep('babel-loader'),
          options: {
            presets: [resolveLocalNodeDep('babel-preset-react')]
          }
        }
      }]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
  });

  let serverProcess;

  compiler.watch({}, (err, stats) => {
    if (!serverProcess) {
      serverProcess = spawn(
        'node',
        [resolveLocalPath(`../dist/${SERVER_BUNDLE_NAME}`)],
        { stdio: 'inherit' }
      );
    }
  });
};
