export enum PayRate {
  salary = 480,
  hourly = 20,
}

export interface FormData {
  employeeName: string;
  userId: string;
  payType: string;
  hours?: string;
  weeksReporting?: string;
  startDate: string;
  finalDate: string;
  note?: string;
  grossWage: number;
  payRate: number;
}
