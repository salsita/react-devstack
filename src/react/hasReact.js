import { existsSync } from 'fs';

import { read, hasDependency } from '../utils/packageJson';
import { resolveAppPath } from '../utils/pathResolvers';

const packageJson = read(resolveAppPath('package.json'));

export default () => {
  if (!hasDependency(packageJson, 'react')) {
    throw new Error('Please install react as a dependency: npm install react --save');
  }

  if (!hasDependency(packageJson, 'react-dom')) {
    throw new Error('Please install react-dom as a dependency: npm install react-dom --save');
  }

  if (!existsSync(resolveAppPath('src/components/Root'))) {
    throw new Error('Please create a root component in src/Components/Root.js');
  }

  return true;
};
