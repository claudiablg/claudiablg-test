// We register the TypeScript evaluator in gatsby-config so we don't need to do
// it in any other .js file. It automatically reads TypeScript config from
// tsconfig.json.
require('ts-node').register({
  project: './tsconfig.config.json',
});

/**
 * DO NOT EDIT THIS FILE DIRECTLY
 * Edit the source file at `./config/gatsby-config.ts`
 */
module.exports = require('./config/gatsby-config');
