import express from 'express';

import enrichClientBundleWithHotReloading from './enrichClientBundleWithHotReloading';
import enrichServerSideRenderingHandler from './enrichServerSideRenderingHandler';
import plainReactProvider from './plainReactProvider';
import { resolveDevStackPath } from '../utils/pathResolvers';

const server = express();
enrichClientBundleWithHotReloading(server, resolveDevStackPath('src/clients/client.dev'));
enrichServerSideRenderingHandler(server, plainReactProvider);
server.listen(3001);
