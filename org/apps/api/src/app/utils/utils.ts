import { SHA256 as sha256 } from 'crypto-js';
import { PayRate } from '@prisma/client';

export const hashPassword = (string: string): string => {
  return sha256(string).toString();
};

export const convertToPrismaPayRate = (rate: number): PayRate => {
  if (rate === 20) {
    return 'hourly';
  } else if (rate === 480) {
    return 'salary';
  }
  throw new Error('Invalid pay rate');
};

export function getPreviousMonday(dateStr: string): Date {
  // Convert input date string to Date object
  const date = new Date(dateStr);

  const day = date.getDay();

  // If it's Monday, return the same date
  if (day === 0) {
    return date;
  }

  const prevMonday = new Date(date);

  // Calculate the difference in days from the previous Monday
  const daysToPrevMonday = day === 0 ? 6 : day - 1;

  // Set the date to the previous Monday
  prevMonday.setDate(date.getDate() - daysToPrevMonday);

  return prevMonday;
}
export function getNextSunday(dateStr: string): Date {
  // Convert input date string to Date object
  const date = new Date(dateStr);

  const day = date.getDay();

  // If it's Sunday, return the same date
  if (day === 0) {
    return date;
  }

  const nextSunday = new Date(date);

  // Calculate the difference in days until the next Sunday
  const daysUntilNextSunday = 7 - day;

  // Set the date to the next Sunday
  nextSunday.setDate(date.getDate() + daysUntilNextSunday);

  return nextSunday;
}
export function formatDate(date: Date): string {
  // Format the date to yyyy-mm-dd
  const formattedDate: string =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0');

  return formattedDate;
}
