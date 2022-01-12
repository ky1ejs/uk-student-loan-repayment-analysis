const f = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const formatPennies = (p: number) => {
  return f.format(p / 100);
};

export default formatPennies;
