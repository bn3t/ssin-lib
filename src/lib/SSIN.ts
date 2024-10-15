import { Type, Gender, LocalDate } from '@/lib/types';
import { SSINExtractorHelper } from '@/lib/SSINExtractorHelper';
import { SSINValidatorHelper } from '@/lib/SSINValidatorHelper';
import { SSINGeneratorHelper } from '@/lib/SSINGeneratorHelper';

export class SSIN {
  private ssin: string;
  private controlNumber: string;
  private orderNumber: string;
  private birthdate: LocalDate | null;
  private gender: Gender;
  private type: Type;

  constructor(ssin: string) {
    ssin = SSINValidatorHelper.clean(ssin);

    if (!SSINValidatorHelper.isValid(ssin)) {
      throw new Error(`The SSIN number is not valid: ${ssin}.`);
    }

    this.ssin = ssin;
    this.controlNumber = SSINExtractorHelper.getControlNumber(this.ssin);
    this.orderNumber = SSINExtractorHelper.getOrderNumber(this.ssin);
    this.type = SSINExtractorHelper.calculateType(this.ssin);
    this.gender = SSINExtractorHelper.calculateGender(this.ssin);
    this.birthdate = SSINExtractorHelper.calculateBirthdate(this.ssin, this.type, this.gender);
  }

  public getSSIN(): string {
    return this.ssin;
  }

  public getFormattedSSIN(): string {
    return SSINExtractorHelper.format(this.ssin);
  }

  public getControlNumber(): string {
    return this.controlNumber;
  }

  public getOrderNumber(): string {
    return this.orderNumber;
  }

  public getBirthdate(): LocalDate | null {
    return this.birthdate;
  }

  public getGender(): Gender | null {
    return this.gender;
  }

  public getType(): Type {
    return this.type;
  }

  public static generateFromBirthdateAndOrderNumber(birthdate: LocalDate, orderNumber: number): SSIN {
    return new SSIN(
      SSINGeneratorHelper.generate(
        birthdate,
        orderNumber % 2 === 1 ? Gender.MALE : Gender.FEMALE,
        orderNumber,
        Type.REGULAR,
      ),
    );
  }
}
