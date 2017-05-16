import { existsSync } from 'fs';
import { resolveAppPath } from '../utils/pathResolvers';

export default () => existsSync(resolveAppPath('src/reducers/rootReducer.js'));
