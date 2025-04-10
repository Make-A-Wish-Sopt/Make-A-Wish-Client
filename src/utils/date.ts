export const getDate = (date: Date, interval: number): Date => {
  const today = new Date(date);
  const dateInterval = new Date(today.setDate(today.getDate() + interval));
  return dateInterval;
};

export const convertDateToString = (date?: Date | string): string | undefined => {
  let targetDate: Date;

  if (!date) {
    targetDate = new Date();
  } else if (typeof date === 'string') {
    targetDate = new Date(date);
  } else {
    targetDate = date;
  }

  if (Number.isNaN(targetDate.getTime())) {
    return undefined;
  }

  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
