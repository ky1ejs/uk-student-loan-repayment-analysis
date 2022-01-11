const parsePercentage = (value?: string) => {
  if (!value) return undefined;
  const interestString = parseFloat(value);
  return interestString <= 0 ? undefined : interestString / 100;
};

export default parsePercentage;
