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

export function getPreviousDay(
  dateStr: string,
  startOfWeek: 'monday' | 'sunday' = 'monday'
): string {
  const daysOfWeek: string[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  // Convert input date string to Date object
  const date: Date = new Date(dateStr);

  const day: number = date.getDay();
  const prevMonday: Date = new Date();
  if (date.getDay() == 0) {
    prevMonday.setDate(date.getDate() - 7);
  } else {
    prevMonday.setDate(date.getDate() - (day - 1));
  }
  console.log(dateStr, startOfWeek, prevMonday);
  return formatDate(prevMonday);
}
