export const preventNegativeValues = (e: any) =>
  ["+", "-"].includes(e.key) && e.preventDefault();
