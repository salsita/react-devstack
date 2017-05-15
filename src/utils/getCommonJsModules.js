import fs from 'fs';

export default path =>
  fs
    .readdirSync(path)
    .filter(module => ['.bin'].indexOf(module) === -1)
    .reduce((memo, module) => ({
      ...memo,
      [module]: `commonjs ${module}`
    }), {});
