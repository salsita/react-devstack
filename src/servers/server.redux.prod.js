import express from 'express';

import enrichProductionStaticFileServing from './enrichProductionStaticFileServing';
import enrichServerSideRenderingHandler from './enrichServerSideRenderingHandler';
import htmlTemplate from '../htmlTemplate';
import reactReduxProvider from './reactReduxProvider';

const manifest = require('./client/asset-manifest.json');

const server = express();
enrichProductionStaticFileServing(server);
enrichServerSideRenderingHandler(server, reactReduxProvider, htmlTemplate(manifest['main.js'], manifest['main.css']));
server.listen(3001);
