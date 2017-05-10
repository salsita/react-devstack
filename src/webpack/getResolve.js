import { resolveAppPath } from '../utils/pathResolvers';

export default () => ({
  modules: [
    // Use node_deps just from the app folder
    resolveAppPath('node_modules')
  ],
  alias: {
    // Create an alias to app sources
    // server entry point includes the app using
    // this alias
    app: resolveAppPath('src')
  }
});
