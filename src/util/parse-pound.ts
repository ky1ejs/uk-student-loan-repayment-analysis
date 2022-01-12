export const stringToPennies = (value?: string) => {
  if (!value) return undefined;
  const parsedValue = parseFloat(value);
  return parsedValue <= 0 ? undefined : parsedValue * 100;
};

export const penniesToString = (value?: number) => {
  return value ? (value / 100).toString() : undefined;
};
