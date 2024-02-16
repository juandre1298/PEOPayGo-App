export interface Datasheets {
  fullName: string;
  payType: string;
  payRate: PayRate;
  hours: string;
  grossWages: string;
}
export enum PayRate {
  salary = 480,
  hourly = 20,
}
