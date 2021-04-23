export const formatDate = (date: Date): string => {
  const [, month, day, year] = date.toDateString().split(" ");
  return `${parseInt(day)} ${month} ${year.slice(2)}`;
};

export const titleCase = (text: string): string => {
  return text
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
