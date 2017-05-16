import { existsSync } from 'fs';

import { resolveAppPath } from '../utils/pathResolvers';

export default () => {
  if (!existsSync(resolveAppPath('src/components/Root.js'))) {
    throw new Error('Please create a root component in src/components/Root.js');
  }

  return true;
};
