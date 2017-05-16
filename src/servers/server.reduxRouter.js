import reactReduxRouterProvider from './providers/reactReduxRouterProvider';
import startServer from './startServer';
import { resolveDevStackPath } from '../utils/pathResolvers';

startServer(reactReduxRouterProvider, resolveDevStackPath('src/clients/client.reduxRouter.js'));
