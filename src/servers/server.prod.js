import express from 'express';

import enrichProductionStaticFileServing from './enrichProductionStaticFileServing';
import enrichServerSideRenderingHandler from './enrichServerSideRenderingHandler';
import plainReactProvider from './plainReactProvider';
import htmlTemplate from '../htmlTemplate';

const manifest = require('./client/asset-manifest.json');

const server = express();
enrichProductionStaticFileServing(server);
enrichServerSideRenderingHandler(server, plainReactProvider, htmlTemplate(manifest['main.js']));
server.listen(3001);
