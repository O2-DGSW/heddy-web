export const formatShortDate = (date: Date | string) => {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? "" : `${d.getMonth() + 1}/${d.getDate()}`;
};
