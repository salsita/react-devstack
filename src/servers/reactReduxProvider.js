import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import buildStore from '../redux/buildStore';

import RootComponent from 'app/components/Root';
import rootReducer from 'app/reducers/rootReducer';

if (module.hot) {
  module.hot.accept('app/components/Root');
  module.hot.accept('app/reducers/rootReducer');
}

export default () => {
  const store = buildStore(rootReducer);

  return {
    state: store.getState(),
    content: renderToString((
      <Provider store={store}>
        <RootComponent />
      </Provider>
    ))
  };
};
