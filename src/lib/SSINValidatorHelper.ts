export class SSINValidatorHelper {
  public static clean(ssin: string): string {
    return ssin.replace(/[^0-9]/g, '');
  }

  public static isValid(ssin: string): boolean {
    if (ssin.length !== 11) {
      return false;
    }
    if (ssin === '00000000000') {
      false;
    }
    const numberWithoutControlNumber = ssin.substring(0, 9);
    const controlNumber = parseInt(ssin.substring(9), 10);
    const expectedCheckDigits = 97 - (parseInt(numberWithoutControlNumber, 10) % 97);
    const numberWithTwo = `2${numberWithoutControlNumber}`;
    const expectedCheckDigitsWithTwo = 97 - (parseInt(numberWithTwo, 10) % 97);
    return controlNumber === expectedCheckDigits || controlNumber === expectedCheckDigitsWithTwo;
  }

  public static calculateControlNumber(reducedSSIN: string, bornAfter1999: boolean): number {
    if (bornAfter1999) {
      reducedSSIN = `2${reducedSSIN}`;
    }
    return 97 - (parseInt(reducedSSIN, 10) % 97);
  }
}
