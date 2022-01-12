import { calculateInvestment } from ".";
import AnnuallyOrMonthly from "../types/AnnuallyOrMonthly";

test("Investing 1k (annual) over 1 month earns 28p interest", () => {
  // £1,000 as pence over a year
  const investment = 1000_00;

  // 4%
  const interest = 0.04;

  // For one month
  const months = 1;

  const result = calculateInvestment(
    { investment: investment, expectedAnnualReturn: interest, investmentFrequency: AnnuallyOrMonthly.Anually},
    months
  );

  // 28p interest
  const expected = 28;

  expect(result.interestEarned).toBe(expected);
});

test("Investing 10k (annual) over 2 months earns", () => {
  // £10,000 as pence over a year
  const investment = 10_000_00;

  // 4%
  const interest = 0.04;

  // For two months
  const months = 2;

  const result = calculateInvestment(
    { investment: investment, expectedAnnualReturn: interest, investmentFrequency: AnnuallyOrMonthly.Anually },
    months
  );

  // £8.34 interest
  const expected = 834;

  expect(result.interestEarned).toBe(expected);
});

test("Investing 10k (annual) over 36 months earns", () => {
  // £10,000 as pence over a year
  const investment = 10_000_00;

  // 4%
  const interest = 0.04;

  // For two months
  const months = 36;

  const result = calculateInvestment(
    { investment: investment, expectedAnnualReturn: interest, investmentFrequency: AnnuallyOrMonthly.Anually },
    months
  );

  // £1,924.03 interest
  const expected = 192403;

  expect(result.interestEarned).toBe(expected);
});
