export const titleCase = (text: string): string => {
  return text
    .replace("_", " ")
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
