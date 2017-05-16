import createRouter from 'router5';
import browserPlugin from 'router5/plugins/browser';

import routes from 'app/routing/routes';

if (module.hot) {
  module.hot.accept('app/routing/routes');
}

export default () => {
  const router = createRouter(routes, { allowNotFound: true });

  if (__BROWSER__) {
    router.usePlugin(browserPlugin());
  }

  return router;
};
