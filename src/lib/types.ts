export enum Type {
  REGULAR = 'REGULAR',
  DOB_UNKNOWN = 'UNKNOWN DOB',
  BIS = 'BIS',
  TER = 'TER',
  UNOFFICIAL = 'UNOFFICIAL',
  UNKNOWN = 'UNKNOWN',
}

// Gender.ts
export enum Gender {
  MALE = 'M',
  FEMALE = 'F',
  UNKNOWN = '',
}

// LocalDate.ts
export class LocalDate {
  private year: number;
  private month: number;
  private day: number;

  private constructor(year: number, month: number, day: number) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

  public static parse(dateString: string): LocalDate {
    const [year, month, day] = dateString.split('-').map(Number);
    return new LocalDate(year, month, day);
  }

  public static of(year: number, month: number, day: number): LocalDate {
    return new LocalDate(year, month, day);
  }

  public getYear(): number {
    return this.year;
  }

  public getMonthValue(): number {
    return this.month;
  }

  public getDayOfMonth(): number {
    return this.day;
  }

  public toString(): string {
    return `${this.year}-${String(this.month).padStart(2, '0')}-${String(this.day).padStart(2, '0')}`;
  }
}
