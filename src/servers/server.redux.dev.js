import express from 'express';

import enrichClientBundleWithHotReloading from './enrichClientBundleWithHotReloading';
import enrichServerSideRenderingHandler from './enrichServerSideRenderingHandler';
import exitWhenError from './exitWhenError';
import reactReduxProvider from './reactReduxProvider';
import { resolveDevStackPath } from '../utils/pathResolvers';

exitWhenError();

const server = express();
enrichClientBundleWithHotReloading(server, resolveDevStackPath('src/clients/client.redux.dev'));
enrichServerSideRenderingHandler(server, reactReduxProvider);
server.listen(3001);
