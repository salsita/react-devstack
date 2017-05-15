import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from 'app/components/Root';

const doRender = (Cmp) => {
  render((
    <AppContainer>
      <Cmp />
    </AppContainer>
  ), document.getElementById('root'));
};

doRender(Root);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('app/components/Root', () => doRender(Root));
}
