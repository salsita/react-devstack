import { existsSync } from 'fs';

import { read, hasDependency } from '../utils/packageJson';
import { resolveAppPath } from '../utils/pathResolvers';

const packageJson = read(resolveAppPath('package.json'));

export default () => {
  if (hasDependency(packageJson, 'redux')) {
    if (!hasDependency(packageJson, 'react-redux')) {
      throw new Error('If you have redux installed as a dependency, please provide react-redux as well. This package cant\'t work without react-redux. Fix the error by running: npm install react-redux --save');
    }

    if (!existsSync(resolveAppPath('src/reducers/rootReducer.js'))) {
      throw new Error('You have redux installed as dependency but no rootReducer has been found in the project. Either create empty reducer inside src/reducers/rootReducer.js or remove redux from package.json dependencies.');
    }
  } else {
    if (existsSync(resolveAppPath('src/reducers/rootReducer.js'))) {
      throw new Error('It seems like you have intended to use redux, because there\'s a rootReducer present in the project, however redux is not installed as a project dependency. Please either install redux by running: npm install redux --save or remove src/reducers/rootReducer.js');
    }

    return false;
  }

  return true;
};
