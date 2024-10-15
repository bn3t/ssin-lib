import { SSINValidatorHelper } from '@/lib/SSINValidatorHelper';
import { Type, Gender, LocalDate } from '@/lib/types';

export class SSINExtractorHelper {
  public static calculateBirthdate(ssin: string, type: Type, gender: Gender): LocalDate | null {
    if (type === Type.DOB_UNKNOWN) {
      return null;
    }

    let birthdateString = ssin.substring(0, 6);
    let month = parseInt(birthdateString.substring(2, 4), 10);

    if (type === Type.BIS && gender === Gender.UNKNOWN) {
      month -= 20;
    } else if (type === Type.BIS) {
      month -= 40;
    } else if (type === Type.TER) {
      month -= 60;
    } else if (type === Type.UNOFFICIAL) {
      month -= 80;
    }

    const century = this.getCentury(ssin);
    const year = `${century}${birthdateString.substring(0, 2)}`;
    return LocalDate.of(
      parseInt(year, 10),
      parseInt(month.toString().padStart(2, '0'), 10),
      parseInt(birthdateString.substring(4, 6), 10),
    );
  }

  public static calculateGender(ssin: string): Gender {
    const controlNumber = parseInt(this.getControlNumber(ssin), 10);
    return controlNumber % 2 === 0 ? Gender.FEMALE : Gender.MALE;
  }

  public static calculateType(ssin: string): Type {
    const month = parseInt(ssin.substring(2, 4), 10);
    if (month === 0) {
      return Type.DOB_UNKNOWN;
    } else if (month > 0 && month < 13) {
      return Type.REGULAR;
    } else if (month >= 21 && month <= 32) {
      return Type.BIS;
    } else if (month >= 41 && month <= 52) {
      return Type.BIS;
    } else if (month >= 61 && month <= 72) {
      return Type.TER;
    } else if (month >= 81 && month <= 92) {
      return Type.UNOFFICIAL;
    } else {
      return Type.UNKNOWN;
    }
  }

  public static getCentury(ssin: string): number {
    const controlNumber = parseInt(this.getControlNumber(ssin), 10);
    const reducedSSIN = ssin.substring(0, 9);
    const calculatedControlNumber = SSINValidatorHelper.calculateControlNumber(reducedSSIN, false);
    if (calculatedControlNumber === controlNumber) {
      return 19;
    }
    return 20;
  }

  public static getControlNumber(ssin: string): string {
    return ssin.substring(ssin.length - 2);
  }

  public static getOrderNumber(ssin: string): string {
    return ssin.substring(ssin.length - 5, ssin.length - 2);
  }

  public static format(ssin: string): string {
    return `${ssin.substring(0, 2)}.${ssin.substring(2, 4)}.${ssin.substring(4, 6)}-${ssin.substring(
      6,
      9,
    )}.${ssin.substring(9, 11)}`;
  }
}
