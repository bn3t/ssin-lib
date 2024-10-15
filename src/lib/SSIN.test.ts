import { describe, test, expect } from 'vitest';

import { SSIN } from '@/lib/SSIN';
import { Gender, LocalDate, Type } from './types';

describe('Test SSIN', () => {
  test('should format a valid SSIN', () => {
    const ssin = new SSIN('05020940753');
    expect(ssin.getFormattedSSIN()).toBe('05.02.09-407.53');
  });

  test('should get the control number', () => {
    const ssin = new SSIN('05020940753');
    expect(ssin.getControlNumber()).toBe('53');
  });

  test('should get the order number', () => {
    const ssin = new SSIN('05020940753');
    expect(ssin.getOrderNumber()).toBe('407');
  });

  test('should get the birthdate', () => {
    const ssin = new SSIN('05020940753');
    expect(ssin.getBirthdate()?.toString()).toBe('2005-02-09');
  });

  test('should get the gender', () => {
    const ssin = new SSIN('05020940753');
    expect(ssin.getGender()).toBe(Gender.MALE);
  });

  test('should get the type', () => {
    const ssin = new SSIN('05020940753');
    expect(ssin.getType()).toBe(Type.REGULAR);
  });

  test('should generate a valid SSIN from birthdate and order number', () => {
    const ssin = SSIN.generateFromBirthdateAndOrderNumber(LocalDate.of(2005, 2, 9), 407);
    expect(ssin.getFormattedSSIN()).toBe('05.02.09-407.53');
  });
});
