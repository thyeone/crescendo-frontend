export const getProgress = (startDate: string, endDate: string) => {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const todayObj = new Date(today);

  const progressInDays = Math.floor(
    (todayObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24),
  );

  const totalDays = Math.floor(
    (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24),
  );

  const progressPercentage = Math.floor((progressInDays / totalDays) * 100);

  if (progressPercentage < 0) return 0;

  return progressPercentage;
};
