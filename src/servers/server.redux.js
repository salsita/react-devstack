import reactReduxProvider from './providers/reactReduxProvider';
import startServer from './startServer';
import { resolveDevStackPath } from '../utils/pathResolvers';

startServer(reactReduxProvider, resolveDevStackPath('src/clients/client.redux.js'));
