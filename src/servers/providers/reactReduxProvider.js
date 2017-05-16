import buildStore from '../../redux/buildStore';
import createRootReducer from '../../redux/createRootReducer';
import renderAppToString from '../../redux/renderAppToString';

import rootReducer from 'app/reducers/rootReducer';

if (module.hot) {
  module.hot.accept('app/reducers/rootReducer');
}

export default () => new Promise((res) => {
  const store = buildStore(createRootReducer(rootReducer));

  res({
    state: store.getState(),
    content: renderAppToString(store),
    found: true
  });
});
