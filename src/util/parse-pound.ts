const parsePound = (value?: string) => {
  if (!value) return undefined;
  const parsedValue = parseFloat(value);
  return parsedValue <= 0 ? undefined : parsedValue * 100;
};

export default parsePound;
