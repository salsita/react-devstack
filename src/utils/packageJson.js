import { readFileSync } from 'fs';

export const read = (path) => {
  const packageJsonContent = readFileSync(path, 'utf-8');
  return JSON.parse(packageJsonContent);
};

export const hasDependency = (packageJson, name) =>
  packageJson.dependencies && !!packageJson.dependencies[name];
