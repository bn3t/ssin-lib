import { describe, it, expect } from 'vitest';
import { SSINValidatorHelper } from './SSINValidatorHelper';

describe('SSIN Validator', () => {
  it('should return true for a valid male SSIN', () => {
    const validMaleSSIN = '42012205181'; // Male born on 22 Jan 1942, valid checksum
    expect(SSINValidatorHelper.isValid(validMaleSSIN)).toBe(true);
  });

  it('should return true for a valid female SSIN', () => {
    const validFemaleSSIN = '42012212408'; // Female born on 22 Jan 1942, valid checksum
    expect(SSINValidatorHelper.isValid(validFemaleSSIN)).toBe(true);
  });

  it('should return false for an SSIN with an invalid checksum', () => {
    const invalidChecksumSSIN = '42012205182'; // Invalid checksum
    expect(SSINValidatorHelper.isValid(invalidChecksumSSIN)).toBe(false);
  });

  it('should return false for an SSIN with an incorrect date format', () => {
    const invalidDateSSIN = '99133205181'; // Invalid month and day
    expect(SSINValidatorHelper.isValid(invalidDateSSIN)).toBe(false);
  });

  it('should return false for an SSIN with incorrect length - 10', () => {
    const shortSSIN = '4201220518'; // Only 10 digits
    expect(SSINValidatorHelper.isValid(shortSSIN)).toBe(false);
  });

  it('should return false for an SSIN with incorrect length - 11', () => {
    const longSSIN = '420122051812'; // 12 digits
    expect(SSINValidatorHelper.isValid(longSSIN)).toBe(false);
  });

  it('should return false for an SSIN with an invalid sequence number', () => {
    const invalidSequenceSSIN = '42012205081'; // Sequence number should be odd for male
    expect(SSINValidatorHelper.isValid(invalidSequenceSSIN)).toBe(false);
  });

  it('should return false for an SSIN with non-numeric characters', () => {
    const nonNumericSSIN = '42012A05181'; // Contains a letter
    expect(SSINValidatorHelper.isValid(nonNumericSSIN)).toBe(false);
  });

  it('should return true for a valid SSIN of a person born after 2000', () => {
    const validPost2000SSIN = '06101212333'; // Person born on 1 Jan 2000, valid checksum
    expect(SSINValidatorHelper.isValid(validPost2000SSIN)).toBe(true);
  });
});
