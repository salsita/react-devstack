import express from 'express';

import enrichClientBundleWithHotReloading from './enrichClientBundleWithHotReloading';
import enrichServerSideRenderingHandler from './enrichServerSideRenderingHandler';
import exitWhenError from './exitWhenError';
import htmlTemplate from '../htmlTemplate';
import plainReactProvider from './plainReactProvider';
import { resolveDevStackPath } from '../utils/pathResolvers';

exitWhenError();

const server = express();
enrichClientBundleWithHotReloading(server, resolveDevStackPath('src/clients/client'));
enrichServerSideRenderingHandler(server, plainReactProvider, htmlTemplate('bundle.js'));
server.listen(process.env.PORT || 3000);
