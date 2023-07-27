export const getDate = (date: Date, interval: number) => {
  const today = new Date(date);
  const dateInterval = new Date(today.setDate(today.getDate() + interval));
  return dateInterval;
};

export const convertDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
