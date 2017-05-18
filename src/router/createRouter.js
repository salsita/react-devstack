import createRouter from 'router5';
import browserPlugin from 'router5/plugins/browser';

export default (routes = []) => {
  const router = createRouter(routes, { allowNotFound: true });

  if (__BROWSER__) {
    router.usePlugin(browserPlugin());
  }

  return router;
};
