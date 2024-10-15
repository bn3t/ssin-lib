import { describe, test, expect } from 'vitest';
import { LocalDate } from './types';

describe('LocalDate', () => {
  test('should create a new LocalDate', () => {
    const date = LocalDate.of(2021, 1, 1);
    expect(date.toString()).toBe('2021-01-01');
  });

  test('should create a new LocalDate from a string', () => {
    const date = LocalDate.parse('2021-01-01');
    expect(date.toString()).toBe('2021-01-01');
  });

  test('should format a LocalDate', () => {
    const date = LocalDate.of(2021, 1, 1);
    expect(date.toString()).toBe('2021-01-01');
  });

  test('should get the year', () => {
    const date = LocalDate.of(2021, 1, 1);
    expect(date.getYear()).toBe(2021);
  });

  test('should get the month', () => {
    const date = LocalDate.of(2021, 1, 1);
    expect(date.getMonthValue()).toBe(1);
  });

  test('should get the day', () => {
    const date = LocalDate.of(2021, 1, 1);
    expect(date.getDayOfMonth()).toBe(1);
  });
});
