import plainReactProvider from './providers/plainReactProvider';
import startServer from './startServer';
import { resolveDevStackPath } from '../utils/pathResolvers';

startServer(plainReactProvider, resolveDevStackPath('src/clients/client.js'));
