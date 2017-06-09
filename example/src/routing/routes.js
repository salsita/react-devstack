import * as Routes from '../constants/routes';

export default [{
  name: Routes.INDEX,
  path: '/'
}, {
  name: Routes.USER,
  path: '/:username'
}, {
  name: Routes.REPO,
  path: '/:username/:repo'
}];
