import express from 'express';

import enrichClientBundleWithHotReloading from './enrichClientBundleWithHotReloading';
import enrichServerSideRenderingHandler from './enrichServerSideRenderingHandler';
import exitWhenError from './exitWhenError';
import plainReactProvider from './plainReactProvider';
import { resolveDevStackPath } from '../utils/pathResolvers';

exitWhenError();

const server = express();
enrichClientBundleWithHotReloading(server, resolveDevStackPath('src/clients/client.dev'));
enrichServerSideRenderingHandler(server, plainReactProvider);
server.listen(3001);
