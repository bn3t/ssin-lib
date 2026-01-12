import { describe, it, expect } from 'vitest';

import { SSINGeneratorHelper } from '@/lib/SSINGeneratorHelper';
import { SSINValidatorHelper } from '@/lib/SSINValidatorHelper';
import { LocalDate, Gender, Type } from '@/lib/types';

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
    expect(ssin).toBe('42812200211');
    expect(SSINValidatorHelper.isValid(ssin)).toBe(true);
  });

  it('should generate a unknown birthdate', () => {
    const birthDate = LocalDate.of(1940, 0, 0);
    const gender = Gender.MALE;
    const ssin = SSINGeneratorHelper.generate(birthDate, gender, 955, Type.REGULAR);
    expect(ssin).toBe('40000095579');
    expect(SSINValidatorHelper.isValid(ssin)).toBe(true);
  });

  it('should generate a valid SSIN when order is null', () => {
    const birthDate = LocalDate.of(1985, 6, 15);
    const gender = Gender.MALE;
    const ssin = SSINGeneratorHelper.generate(birthDate, gender, null, Type.REGULAR);
    expect(SSINValidatorHelper.isValid(ssin)).toBe(true);
  });

  it('should generate an odd order number for male when order is null', () => {
    const birthDate = LocalDate.of(1985, 6, 15);
    const gender = Gender.MALE;
    const ssin = SSINGeneratorHelper.generate(birthDate, gender, null, Type.REGULAR);
    const orderNumber = parseInt(ssin.substring(6, 9), 10);
    expect(orderNumber % 2).toBe(1);
  });

  it('should generate an even order number for female when order is null', () => {
    const birthDate = LocalDate.of(1985, 6, 15);
    const gender = Gender.FEMALE;
    const ssin = SSINGeneratorHelper.generate(birthDate, gender, null, Type.REGULAR);
    console.log(ssin)

    const orderNumber = parseInt(ssin.substring(6, 9), 10);
    expect(orderNumber % 2).toBe(0);
  });
});
