import { describe, it, expect } from 'vitest';
import { SSIN } from './index';

describe('Basic test on SSIN', () => {
  it('should format a valid ssin', () => {
    const ssin = new SSIN('05020940753');
    expect(ssin.getFormattedSSIN()).toBe('05.02.09-407.53');
  });
});
