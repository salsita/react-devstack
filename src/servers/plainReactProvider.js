import React from 'react';
import { renderToString } from 'react-dom/server';

import RootComponent from 'app/components/Root';

if (module.hot) {
  module.hot.accept('app/components/Root');
}

export default () => ({
  content: renderToString(<RootComponent />)
});

