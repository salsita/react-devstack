import 'react-hot-loader/patch';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import buildStore from '../redux/buildStore';

import Root from 'app/components/Root';
import rootReducer from 'app/reducers/rootReducer';

const store = buildStore(rootReducer);

const doRender = (Cmp) => {
  render((
    <AppContainer>
      <Provider store={store}>
        <Cmp />
      </Provider>
    </AppContainer>
  ), document.getElementById('root'));
};

doRender(Root);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('app/components/Root', () => doRender(Root));
  module.hot.accept('app/reducers/rootReducer', () => {
    store.replaceReducer(rootReducer);
  });
}
