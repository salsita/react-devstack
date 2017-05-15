import express from 'express';

export default (server) => {
  server.use('/', express.static('./dist/client'));
};
