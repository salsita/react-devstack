/* global document */

import 'react-hot-loader/patch';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from 'app/components/Root'; // eslint-disable-line

const doRender = (Cmp) => {
  render((
    <AppContainer>
      <Cmp />
    </AppContainer>
  ), document.getElementById('root'));
};

doRender(Root);

if (module.hot) {
  module.hot.accept('app/components/Root', () => doRender(Root));
}
