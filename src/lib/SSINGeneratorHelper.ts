import { Type, Gender, LocalDate } from './types';
import { SSINValidatorHelper } from './SSINValidatorHelper';

export class SSINGeneratorHelper {
  public static generate(birthDate: LocalDate, gender: Gender, orderNumber: number | null = null, type: Type): string {
    if (orderNumber !== null && (orderNumber < 1 || orderNumber > 999)) {
      throw new Error('The order number must be between 1 and 999.');
    }
    if (gender !== Gender.FEMALE && gender !== Gender.MALE && gender !== Gender.UNKNOWN) {
      throw new Error('The gender must be null, F, or M.');
    }
    if (orderNumber != null && gender !== Gender.UNKNOWN) {
      const isEven = orderNumber % 2 === 0;
      if ((isEven && gender === Gender.MALE) || (!isEven && gender === Gender.FEMALE)) {
        throw new Error('The gender does not match the order number.');
      }
    }
    const birthString = this.modifyDateOfBirth(birthDate, type, gender);
    const orderString = this.generateStringOrderNumber(orderNumber, gender);
    const controlNumber = this.generateStringControlNumber(birthDate, birthString, orderString);
    return `${birthString}${orderString}${controlNumber}`;
  }

  public static modifyDateOfBirth(birthDate: LocalDate, type: Type, gender: Gender): string {
    let month = birthDate.getMonthValue();

    if (type === Type.DOB_UNKNOWN) {
      return '000001';
    } else if (type === Type.UNOFFICIAL) {
      month += 80;
    } else if (type === Type.BIS && gender !== Gender.UNKNOWN) {
      month += 40;
    } else if (type === Type.BIS && gender === Gender.UNKNOWN) {
      month += 20;
    } else if (type === Type.TER) {
      month += 60;
    }
    return `${birthDate.getYear().toString().substring(2)}${month.toString().padStart(2, '0')}${birthDate
      .getDayOfMonth()
      .toString()
      .padStart(2, '0')}`;
  }

  private static generateStringControlNumber(birthDate: LocalDate, birthString: string, orderString: string): string {
    const unionString = `${birthString}${orderString}`;
    const isAfter1999 = birthDate.getYear() > 1999;
    const controlNumber = SSINValidatorHelper.calculateControlNumber(unionString, isAfter1999);
    return controlNumber.toString().padStart(2, '0');
  }

  private static generateStringOrderNumber(orderNumber: number | null = null, gender: Gender | null = null): string {
    if (orderNumber !== null && (orderNumber < 1 || orderNumber > 999)) {
      throw new Error('The order number must be null or between 1 and 999.');
    }

    let order: number;
    if (orderNumber) {
      order = orderNumber;
    } else if (gender === Gender.UNKNOWN) {
      order = Math.floor(Math.random() * 999) + 1;
    } else {
      order = 1 + Math.floor(Math.random() * 499) * 2;
      if (gender === Gender.MALE) {
        order--;
      }
    }
    return order.toString().padStart(3, '0');
  }
}
