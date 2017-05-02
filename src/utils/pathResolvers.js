import { resolve } from 'path';

export const resolveAppPath = path => resolve(process.cwd(), path);

export const resolveDevStackPath = path => resolveAppPath(`node_modules/react-devstack/${path}`);
