import { describe, it, expect } from 'vitest';

import { SSINExtractorHelper } from './SSINExtractorHelper';
import { Gender, LocalDate, Type } from './types';

describe('SSIN Extractor Helper', () => {
  it('should correctly calculate birthdate for a regular SSIN', () => {
    const ssin = '42012205181'; // Male born on 22 Jan 1942
    const birthdate = SSINExtractorHelper.calculateBirthdate(ssin, Type.REGULAR, Gender.MALE);
    expect(birthdate).toEqual(LocalDate.of(1942, 1, 22));
  });

  it('should return null for an SSIN with unknown DOB type', () => {
    const ssin = '00000000000'; // DOB unknown
    const birthdate = SSINExtractorHelper.calculateBirthdate(ssin, Type.DOB_UNKNOWN, Gender.UNKNOWN);
    expect(birthdate).toBeNull();
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
