import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

const resolveRootComponent = () => require('app/components/Root').default;

let Root = resolveRootComponent();

if (module.hot) {
  module.hot.accept('app/components/Root', () => {
    try {
      Root = resolveRootComponent();
    } catch (ex) {
      console.error(ex);
    }
  });
}

const app = express();
app.get('*', (req, res) => {
  res.send(renderToString(<Root />));
});
app.listen(3001);
