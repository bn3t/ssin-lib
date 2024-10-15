import { describe, it, expect } from 'vitest';

import { SSINExtractorHelper } from '@/lib/SSINExtractorHelper';
import { Gender, LocalDate, Type } from '@/lib/types';

describe('SSIN Extractor Helper', () => {
  it.each([
    ['42012205181', Type.REGULAR, Gender.MALE, LocalDate.of(1942, 1, 22)],
    ['00000000000', Type.DOB_UNKNOWN, Gender.UNKNOWN, null],
  ])('should correctly calculate birthdate for %s, %s, %s', (ssin, type, gender, expectedDate) => {
    const birthdate = SSINExtractorHelper.calculateBirthdate(ssin, type, gender);
    expect(birthdate).toEqual(expectedDate);
  });

  it('should correctly calculate gender as female', () => {
    const ssin = '42012212408'; // Female
    const gender = SSINExtractorHelper.calculateGender(ssin);
    expect(gender).toBe(Gender.FEMALE);
  });

  it('should correctly calculate gender as male', () => {
    const ssin = '42012205181'; // Male
    const gender = SSINExtractorHelper.calculateGender(ssin);
    expect(gender).toBe(Gender.MALE);
  });

  it('should correctly calculate type as BIS - sexe known', () => {
    const ssin = '42432205181'; // BIS type
    const type = SSINExtractorHelper.calculateType(ssin);
    expect(type).toBe(Type.BIS);
  });

  it('should correctly calculate type as BIS - sexe unknown', () => {
    const ssin = '42232205181'; // BIS type
    const type = SSINExtractorHelper.calculateType(ssin);
    expect(type).toBe(Type.BIS);
  });

  it('should correctly calculate type as regular', () => {
    const ssin = '42012205181'; // Regular type
    const type = SSINExtractorHelper.calculateType(ssin);
    expect(type).toBe(Type.REGULAR);
  });

  it('should correctly calculate century for a person born in the 20th century', () => {
    const ssin = '42012205181'; // Born in 1942
    const century = SSINExtractorHelper.getCentury(ssin);
    expect(century).toBe(19);
  });

  it('should correctly calculate century for a person born in the 21st century', () => {
    const ssin = '00200100118'; // Born in 2000
    const century = SSINExtractorHelper.getCentury(ssin);
    expect(century).toBe(20);
  });
});
