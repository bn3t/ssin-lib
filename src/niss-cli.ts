#!/usr/bin/env node

import { greet } from './lib/index.js';

const args = process.argv.slice(2);

if (args.length > 0) {
  console.log(greet(args[0]));
} else {
  console.log('Usage: my-cli <name>');
}
