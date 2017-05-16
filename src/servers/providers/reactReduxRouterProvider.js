import { router5Middleware, router5Reducer } from 'redux-router5';

import buildStore from '../../redux/buildStore';
import renderAppToString from '../../redux/renderAppToString';
import createRouter from '../../router/createRouter';
import { isNotFoundRoute } from '../../selectors';

import rootReducer from 'app/reducers/rootReducer';

if (module.hot) {
  module.hot.accept('app/reducers/rootReducer');
}

export default url => new Promise((res, rej) => {
  const router = createRouter();

  const store = buildStore(rootReducer, {
    router: router5Reducer
  }, router5Middleware(router));

  router.start(url, (error) => {
    if (error) {
      rej(error);
    } else {
      const state = store.getState();
      const found = !isNotFoundRoute(state);

      res({
        state,
        content: renderAppToString(store),
        found
      });
    }
  });
});
