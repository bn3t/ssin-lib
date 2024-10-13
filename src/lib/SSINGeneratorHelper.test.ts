import { describe, it, expect } from 'vitest';

import { SSINGeneratorHelper } from './SSINGeneratorHelper';
import { SSINValidatorHelper } from './SSINValidatorHelper';
import { LocalDate, Gender, Type } from './types';

describe('SSIN Generator Helper', () => {
  it('should generate a valid SSIN for a male born on 1 Jan 2000', () => {
    const birthDate = LocalDate.of(2000, 1, 1);
    const gender = Gender.MALE;
    const ssin = SSINGeneratorHelper.generate(birthDate, gender, 1, Type.REGULAR);
    expect(SSINValidatorHelper.isValid(ssin)).toBe(true);
  });

  it('should generate a valid SSIN for a female born on 22 Jan 1942', () => {
    const birthDate = LocalDate.of(1942, 1, 22);
    const gender = Gender.FEMALE;
    const ssin = SSINGeneratorHelper.generate(birthDate, gender, 2, Type.REGULAR);
    expect(SSINValidatorHelper.isValid(ssin)).toBe(true);
  });

  it('should throw an error if the order number is out of range', () => {
    const birthDate = LocalDate.of(1942, 1, 22);
    const gender = Gender.MALE;
    expect(() => {
      SSINGeneratorHelper.generate(birthDate, gender, 1000, Type.REGULAR);
    }).toThrow('The order number must be between 1 and 999.');
  });

  it('should throw an error if the gender does not match the order number', () => {
    const birthDate = LocalDate.of(1942, 1, 22);
    const gender = Gender.MALE;
    expect(() => {
      SSINGeneratorHelper.generate(birthDate, gender, 2, Type.REGULAR);
    }).toThrow('The gender does not match the order number.');
  });

  it('should generate a valid BIS SSIN for a person with unknown gender', () => {
    const birthDate = LocalDate.of(1942, 1, 22);
    const gender = Gender.UNKNOWN;
    const ssin = SSINGeneratorHelper.generate(birthDate, gender, null, Type.BIS);
    expect(SSINValidatorHelper.isValid(ssin)).toBe(true);
  });

  it('should generate a valid unofficial SSIN', () => {
    const birthDate = LocalDate.of(1942, 1, 22);
    const gender = Gender.FEMALE;
    const ssin = SSINGeneratorHelper.generate(birthDate, gender, 2, Type.UNOFFICIAL);
    expect(SSINValidatorHelper.isValid(ssin)).toBe(true);
  });
});
