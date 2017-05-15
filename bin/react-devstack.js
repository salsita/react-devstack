#!/usr/bin/env node
var devRunner = require('../lib/devRunner.js').default;
var build = require('../lib/build.js').default;

var script = process.argv[2];
var args = process.argv.slice(3);

switch (script) {
  case 'build':
    build();
  break;
  case 'dev':
    devRunner();
  break;
  default:
    throw new Error('Unknown argument ' + script);
}
