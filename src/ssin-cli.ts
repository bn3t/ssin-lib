#!/usr/bin/env node
import { program } from 'commander';
import packageJson from '../package.json';

import { SSIN } from '@/lib/SSIN.js';
import { LocalDate } from '@/lib/types.js';

function validate(ssinAsString: string) {
  try {
    const ssin = new SSIN(ssinAsString);
    console.log(`SSIN is valid: ${ssin.getFormattedSSIN()}`);
    console.log('Birthdate:', ssin.getBirthdate()?.toString());
    console.log('Type:', ssin.getType());
    console.log('Order:', ssin.getOrderNumber());
    console.log('Gender:', ssin.getGender());
  } catch (error: any) {
    console.error(error.message);
  }
}

function generate(options: { date: string; order: string }) {
  try {
    const { date, order } = options;
    const ssin = SSIN.generateFromBirthdateAndOrderNumber(LocalDate.parse(date), parseInt(order, 10));
    console.log(`Generated SSIN: ${ssin.getFormattedSSIN()} - (${ssin.getSSIN()})`);
  } catch (error: any) {
    console.error(error.message);
  }
}

program
  .name('ssin-cli')
  .description('Generate or validate SSIN numbers')
  .configureHelp({ showGlobalOptions: true })
  .showHelpAfterError()
  .version(packageJson.version);

program
  .command('validate')
  .argument('<string>', 'SSIN number to validate')
  .description('Validate an SSIN number')
  .action(validate);

program
  .command('generate')
  .requiredOption('-d, --date <date>', 'Date of birth in the format YYYY-MM-DD')
  .requiredOption('-o, --order <order>', 'Order number between 1 and 999 (odd=mens, even=womens)')
  .description('Generate a SSIN number based on the provided parameters')
  .action(generate);

program.parse();
