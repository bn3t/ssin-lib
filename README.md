![Build Status](https://github.com/bn3t/ssin-lib/actions/workflows/ci.yml/badge.svg)

# SSIN Library

A TypeScript library for handling and manipulating SSIN (Social Security Identification Number) in a consistent and robust manner. This library provides functionality for validation, formatting, extracting details like birthdate, gender, and generating SSIN numbers.

## Features

- **Validation**: Validate SSIN numbers to check if they are correctly formatted and contain valid information.
- **Formatting**: Format SSIN numbers in a standard way for easy readability.
- **Extraction**: Extract information like birthdate, gender, and control numbers from SSIN.
- **Generation**: Generate valid SSIN numbers based on provided birthdate, gender, and other parameters.

## Installation

Install the package via npm:

```bash
npm install @bn3t/ssin-lib
```

or via Yarn:

```bash
yarn add @bn3t/ssin-lib
```

## Usage

### Importing

You can use the SSIN class and other utilities by importing them:

```typescript
import { SSIN } from '@bn3t/ssin-lib';
import { LocalDate } from '@bn3t/ssin-lib/types';
```

### Validation

To validate an SSIN number:

```typescript
const ssin = new SSIN('05020940753');
console.log(ssin.getFormattedSSIN()); // "05.02.09-407.53"
console.log(ssin.getBirthdate()?.toString()); // "2005-02-09"
console.log(ssin.getGender()); // Gender.MALE
```

### Generation

To generate a valid SSIN based on birthdate and order number:

```typescript
const birthdate = LocalDate.of(2005, 2, 9);
const orderNumber = 407;
const ssin = SSIN.generateFromBirthdateAndOrderNumber(birthdate, orderNumber);
console.log(ssin.getFormattedSSIN()); // "05.02.09-407.53"
```

### Command Line Interface (CLI)

This library comes with a CLI tool for quick validation and generation of SSIN numbers.

```bash
ssin validate 05020940753
```

To generate an SSIN from birthdate and order number:

```bash
ssin generate -d 2005-02-09 -o 407
```

## Development

### Testing

This library uses Vitest for unit tests.

To run the tests:

```bash
npm run test
```

### Building

To build the library:

```bash
npm run build
```

## License

This project is licensed under the MIT License.

## Contributing

Feel free to contribute by opening issues or submitting pull requests.

## Contact

If you have any questions or feedback, feel free to reach out.

### Note

This library is designed to work with specific formats of SSIN and may not cover all edge cases for every country. Please make sure it fits your use case before using it in a production environment.
