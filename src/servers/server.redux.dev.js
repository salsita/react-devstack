import express from 'express';

import enrichClientBundleWithHotReloading from './enrichClientBundleWithHotReloading';
import enrichServerSideRenderingHandler from './enrichServerSideRenderingHandler';
import reactReduxProvider from './reactReduxProvider';
import { resolveDevStackPath } from '../utils/pathResolvers';

const server = express();
enrichClientBundleWithHotReloading(server, resolveDevStackPath('src/clients/client.redux.dev'));
enrichServerSideRenderingHandler(server, reactReduxProvider);
server.listen(3001);
