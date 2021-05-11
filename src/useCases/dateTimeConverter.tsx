export const shortISOFormat = (dateString: string) =>
  new Date(dateString).toISOString().slice(0, 16);

export const yyyyMmDdFormat = (isoString: string) => isoString.slice(0, 10);
