#!/usr/bin/env node

import { SSIN } from './lib/index';

const args = process.argv.slice(2);

if (args.length > 0) {
  console.log(new SSIN(args[0]).getFormattedSSIN());
} else {
  console.log('Usage: ssin-cli <name>');
}
