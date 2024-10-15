import { describe, test, expect } from 'vitest';
import { SSINValidatorHelper } from '@/lib/SSINValidatorHelper';

describe('SSIN Validator', () => {
  test.each([
    ['88101135767', true],
    ['881011357678', false],
    ['88101135768', false],
    ['84032705794', false],
    ['99501600009', true],
    ['42012205181', true],
    ['42012212408', true],
    ['42012205182', false],
    ['99133205181', false],
    ['4201220518', false],
    ['420122051812', false],
    ['42012205081', false],
    ['42012A05181', false],
    ['06101212333', true],
    ['40000095579', true],
  ])('should validate %s to %s', (ssin, expected) => {
    expect(SSINValidatorHelper.isValid(ssin)).toBe(expected);
  });
});
