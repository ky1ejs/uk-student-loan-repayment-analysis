import AnnuallyOrMonthly from "./AnnuallyOrMonthly";

interface InvestmentConfig {
  investment: number;
  expectedAnnualReturn: number;
  investmentFrequency: AnnuallyOrMonthly
}

export default InvestmentConfig;
