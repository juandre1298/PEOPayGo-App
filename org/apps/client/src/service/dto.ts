export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  type: 'admin' | 'customer';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateUserDto {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  type: string;
}

export interface UpdateUserDto {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  type?: string;
}

export interface LogedSession {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  type?: string;
}

export interface DecodedToken {
  userId: string;
  userType: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}

export interface Session {
  id: string;
  type: string;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
}

export interface ContextProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

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
  payRate: PayRate;
}

export interface Datasheets {
  fullName: string;
  payType: string;
  payRate: PayRate;
  hours: string;
  grossWages: string;
}
