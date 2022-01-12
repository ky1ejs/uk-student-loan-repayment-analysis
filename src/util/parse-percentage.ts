
export const stringToPercentage = (value?: string) => {
  if (!value) return undefined;
  const interestString = parseFloat(value);
  return interestString <= 0 ? undefined : interestString / 100;
};

export const percentageToString = (value?: number) => {
  return value ? (value * 100).toString() : undefined
}
