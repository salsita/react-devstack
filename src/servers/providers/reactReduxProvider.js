import buildStore from '../../redux/buildStore';
import renderAppToString from '../../redux/renderAppToString';

import rootReducer from 'app/reducers/rootReducer';

if (module.hot) {
  module.hot.accept('app/reducers/rootReducer');
}

export default () => new Promise((res) => {
  const store = buildStore(rootReducer);

  res({
    state: store.getState(),
    content: renderAppToString(store),
    found: true
  });
});
