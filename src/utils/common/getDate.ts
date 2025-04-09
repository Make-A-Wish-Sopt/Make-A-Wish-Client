export const getDate = (date: Date, interval: number) => {
  const today = new Date(date);
  const dateInterval = new Date(today.setDate(today.getDate() + interval));
  return dateInterval;
};

export const convertDateToString = (date?: Date | string) => {
  const targetDate = !date ? new Date() : typeof date === 'string' ? new Date(date) : date;

  if (isNaN(targetDate.getTime())) return;

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
