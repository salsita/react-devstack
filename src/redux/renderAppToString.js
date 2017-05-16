import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import RootComponent from 'app/components/Root';

if (module.hot) {
  module.hot.accept('app/components/Root');
}

export default store => renderToString((
  <Provider store={store}>
    <RootComponent />
  </Provider>
));
